require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const MONGODB_URI = process.env.MONGODB_URI || '';

// Keep these in sync with public/js/main.js
const EVENT_TYPES = ['Holiday party', 'Conference', 'Team offsite', 'Awards night', 'Emcee / host', 'Other'];
const AUDIENCE_SIZES = ['Under 50', '50–200', '200–500', '500+'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ---------- Validation ---------- */

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validateBooking(body = {}) {
  const data = {
    name: clean(body.name, 100),
    company: clean(body.company, 120),
    email: clean(body.email, 200).toLowerCase(),
    eventDate: clean(body.eventDate, 10),
    eventType: clean(body.eventType, 40),
    audienceSize: clean(body.audienceSize, 20),
    message: clean(body.message, 2000),
  };
  const errors = {};

  if (!data.name) errors.name = 'Please tell us your name.';
  if (!data.email) errors.email = 'Please add your email.';
  else if (!EMAIL_RE.test(data.email)) errors.email = 'That email doesn’t look right.';

  if (data.eventDate) {
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(data.eventDate) && !Number.isNaN(Date.parse(data.eventDate));
    if (!valid) errors.eventDate = 'Please pick a valid date.';
    else {
      const yesterday = new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString().slice(0, 10);
      if (data.eventDate < yesterday) errors.eventDate = 'That date has already passed.';
    }
  }
  if (data.eventType && !EVENT_TYPES.includes(data.eventType)) errors.eventType = 'Please pick an event type.';
  if (data.audienceSize && !AUDIENCE_SIZES.includes(data.audienceSize)) errors.audienceSize = 'Please pick an audience size.';

  return { data, errors };
}

/* ---------- Storage: MongoDB if configured, otherwise a JSON file ---------- */

async function createStore() {
  if (MONGODB_URI) {
    const mongoose = require('mongoose');
    await mongoose.connect(MONGODB_URI);
    const Booking = mongoose.model(
      'Booking',
      new mongoose.Schema(
        {
          name: { type: String, required: true },
          company: String,
          email: { type: String, required: true },
          eventDate: String,
          eventType: String,
          audienceSize: String,
          message: String,
        },
        { timestamps: true }
      )
    );
    console.log('Storage: MongoDB');
    return {
      add: (doc) => Booking.create(doc),
      list: () => Booking.find().sort({ createdAt: -1 }).lean(),
    };
  }

  const dir = path.join(__dirname, 'data');
  const file = path.join(dir, 'bookings.json');
  await fs.mkdir(dir, { recursive: true });

  const read = async () => {
    try {
      return JSON.parse(await fs.readFile(file, 'utf8'));
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  };

  // Serialize writes so two requests at once can't overwrite each other.
  let queue = Promise.resolve();
  console.log('Storage: data/bookings.json (set MONGODB_URI to use MongoDB)');
  return {
    add: (doc) => {
      const job = queue.then(async () => {
        const all = await read();
        const record = { _id: crypto.randomUUID(), ...doc, createdAt: new Date().toISOString() };
        all.push(record);
        await fs.writeFile(file, JSON.stringify(all, null, 2));
        return record;
      });
      queue = job.catch(() => {});
      return job;
    },
    list: async () => (await read()).reverse(),
  };
}

/* ---------- Simple per-IP rate limit for the booking form ---------- */

const hits = new Map();
function rateLimited(ip, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
}

function tokenMatches(given) {
  if (!ADMIN_TOKEN || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(ADMIN_TOKEN);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/* ---------- App ---------- */

async function main() {
  const store = await createStore();
  const app = express();

  app.use(express.json({ limit: '20kb' }));
  app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

  app.post('/api/bookings', async (req, res) => {
    if (rateLimited(req.ip)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    // Honeypot: real people never fill the hidden "website" field.
    if (req.body && req.body.website) return res.status(201).json({ ok: true });

    const { data, errors } = validateBooking(req.body);
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    try {
      await store.add(data);
      res.status(201).json({ ok: true });
    } catch (err) {
      console.error('Failed to save booking:', err);
      res.status(500).json({ error: 'Could not save your request.' });
    }
  });

  // Owner-only: list booking requests. Requires "Authorization: Bearer <ADMIN_TOKEN>".
  app.get('/api/bookings', async (req, res) => {
    if (!ADMIN_TOKEN) return res.status(404).json({ error: 'Admin is disabled. Set ADMIN_TOKEN in .env.' });
    const token = (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
    if (!tokenMatches(token)) return res.status(401).json({ error: 'Wrong password.' });
    try {
      res.json({ bookings: await store.list() });
    } catch (err) {
      console.error('Failed to list bookings:', err);
      res.status(500).json({ error: 'Could not load bookings.' });
    }
  });

  app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', 'index.html')));

  app.listen(PORT, () => console.log(`Nicole's site running at http://localhost:${PORT}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
