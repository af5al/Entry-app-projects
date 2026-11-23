(function () {
  'use strict';

  const DATA = window.SITE_DATA || {};
  const page = document.body.dataset.page || 'index';

  const NAV = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['videos.html', 'Videos'],
    ['shows.html', 'Shows'],
    ['testimonials.html', 'Testimonials'],
  ];

  // Keep in sync with server.js
  const EVENT_TYPES = ['Holiday party', 'Conference', 'Team offsite', 'Awards night', 'Emcee / host', 'Other'];
  const AUDIENCE_SIZES = ['Under 50', '50–200', '200–500', '500+'];
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  /* ---------- Header & mobile menu ---------- */

  function renderHeader() {
    const host = document.getElementById('site-header');
    if (!host) return;
    const links = NAV.map(
      ([href, label]) =>
        `<li><a href="${href}"${href === page + '.html' ? ' aria-current="page"' : ''}>${label}</a></li>`
    ).join('');

    host.outerHTML = `
      <header class="site-header">
        <div class="container nav-bar">
          <a class="logo" href="index.html" aria-label="Nicole, home">NICOLE<span>!</span></a>
          <nav class="nav-desktop" aria-label="Main"><ul>${links}</ul></nav>
          <a class="btn btn-orange nav-cta" href="contact.html">Book Nicole</a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-panel">
            <span class="menu-icon" aria-hidden="true"></span><span>Menu</span>
          </button>
        </div>
      </header>
      <div class="panel-backdrop" data-close-menu></div>
      <aside id="mobile-panel" class="mobile-panel" aria-label="Menu">
        <button class="panel-close" type="button" data-close-menu aria-label="Close menu">✕</button>
        <nav aria-label="Mobile"><ul>${links}</ul></nav>
        <a class="btn btn-orange btn-lg" href="contact.html">Book Nicole</a>
      </aside>`;

    const btn = document.querySelector('.menu-btn');
    const panel = document.getElementById('mobile-panel');
    panel.inert = true;

    const setOpen = (open) => {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      panel.inert = !open;
      if (open) panel.querySelector('a').focus();
      else btn.focus({ preventScroll: true });
    };

    btn.addEventListener('click', () => setOpen(true));
    document.querySelectorAll('[data-close-menu]').forEach((el) => el.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setOpen(false);
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
      if (e.matches && document.body.classList.contains('menu-open')) setOpen(false);
    });
  }

  function renderFooter() {
    const host = document.getElementById('site-footer');
    if (!host) return;
    const social = Object.entries(DATA.social || {})
      .filter(([, url]) => url)
      .map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a>`)
      .join('');
    host.outerHTML = `
      <footer class="site-footer">
        <div class="container footer-inner">
          <div>
            <p class="footer-logo">Nicole <span>—</span> Comedian &amp; Host</p>
            <p>Clean comedy for corporate events</p>
          </div>
          <div class="footer-links">
            ${social}
            <a href="contact.html">Book Nicole</a>
          </div>
        </div>
        <div class="container footer-small">© ${new Date().getFullYear()} Nicole Tran</div>
      </footer>`;
  }

  /* ---------- Booking form ---------- */

  const field = (id, label, input, hint = '') => `
    <div class="field" data-field="${id}">
      <label for="bk-${id}">${label}</label>
      ${input}
      ${hint ? `<p class="hint">${hint}</p>` : ''}
      <p class="error" id="bk-${id}-error" aria-live="polite"></p>
    </div>`;

  const options = (list, placeholder) =>
    `<option value="">${placeholder}</option>` + list.map((v) => `<option>${esc(v)}</option>`).join('');

  function renderBookingForms() {
    document.querySelectorAll('[data-booking-form]').forEach((host) => {
      const today = new Date();
      const min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

      host.innerHTML = `
        <form class="booking-form card" novalidate>
          <div class="form-grid">
            ${field('name', 'Your name <span class="req">*</span>', '<input id="bk-name" name="name" type="text" autocomplete="name" maxlength="100" required>')}
            ${field('company', 'Company', '<input id="bk-company" name="company" type="text" autocomplete="organization" maxlength="120">')}
            ${field('email', 'Email <span class="req">*</span>', '<input id="bk-email" name="email" type="email" autocomplete="email" maxlength="200" required>')}
            ${field('eventDate', 'Event date', `<input id="bk-eventDate" name="eventDate" type="date" min="${min}">`)}
            ${field('eventType', 'Event type', `<select id="bk-eventType" name="eventType">${options(EVENT_TYPES, 'Choose one…')}</select>`)}
            ${field('audienceSize', 'Audience size', `<select id="bk-audienceSize" name="audienceSize">${options(AUDIENCE_SIZES, 'Choose one…')}</select>`)}
            <div class="field field-full" data-field="message">
              <label for="bk-message">Tell me about your event</label>
              <textarea id="bk-message" name="message" rows="5" maxlength="2000" placeholder="Venue, timing, the vibe, inside jokes I should know…"></textarea>
              <p class="error" id="bk-message-error" aria-live="polite"></p>
            </div>
            <div class="hp" aria-hidden="true">
              <label for="bk-website">Leave this empty</label>
              <input id="bk-website" name="website" type="text" tabindex="-1" autocomplete="off">
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-black btn-lg">Send request →</button>
            <p class="form-status" role="status"></p>
          </div>
        </form>
        <div class="form-success card" tabindex="-1" hidden>
          <span class="sticker sticker-orange">Booked-ish!</span>
          <h3>Request received!</h3>
          <p>Thanks! Nicole will get back to you within two business days to talk dates, details and how funny you want it.</p>
          <button type="button" class="btn btn-white" data-reset>Send another request</button>
        </div>`;

      wireForm(host);
    });
  }

  function validate(values) {
    const errors = {};
    if (!values.name.trim()) errors.name = 'Please tell us your name.';
    if (!values.email.trim()) errors.email = 'Please add your email.';
    else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email doesn’t look right.';
    if (values.eventDate) {
      const [y, m, d] = values.eventDate.split('-').map(Number);
      const picked = new Date(y, m - 1, d);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(picked.getTime())) errors.eventDate = 'Please pick a valid date.';
      else if (picked < today) errors.eventDate = 'That date has already passed.';
    }
    return errors;
  }

  function wireForm(host) {
    const form = host.querySelector('form');
    const success = host.querySelector('.form-success');
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('[type="submit"]');
    const touched = new Set();

    const values = () => Object.fromEntries(new FormData(form).entries());

    const showErrors = (errors, only) => {
      form.querySelectorAll('[data-field]').forEach((wrap) => {
        const name = wrap.dataset.field;
        if (only && !only.has(name)) return;
        const input = wrap.querySelector('input, select, textarea');
        const msg = errors[name] || '';
        wrap.querySelector('.error').textContent = msg;
        wrap.classList.toggle('has-error', !!msg);
        if (msg) {
          input.setAttribute('aria-invalid', 'true');
          input.setAttribute('aria-describedby', `bk-${name}-error`);
        } else {
          input.removeAttribute('aria-invalid');
        }
      });
    };

    form.addEventListener('focusout', (e) => {
      if (!e.target.name || e.target.name === 'website') return;
      touched.add(e.target.name);
      showErrors(validate(values()), touched);
    });
    form.addEventListener('input', (e) => {
      if (touched.has(e.target.name)) showErrors(validate(values()), touched);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      const data = values();
      const errors = validate(data);
      showErrors(errors);
      if (Object.keys(errors).length) {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      try {
        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const body = await res.json().catch(() => ({}));
        if (res.ok) {
          form.hidden = true;
          success.hidden = false;
          success.focus();
          form.reset();
          touched.clear();
        } else if (res.status === 400 && body.errors) {
          showErrors(body.errors);
          status.textContent = 'Please fix the highlighted fields.';
        } else {
          status.textContent = body.error || 'Something went wrong. Please try again.';
        }
      } catch {
        status.textContent = 'Couldn’t reach the server. Please try again in a moment.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send request →';
      }
    });

    success.querySelector('[data-reset]').addEventListener('click', () => {
      success.hidden = true;
      form.hidden = false;
      form.querySelector('input').focus();
    });
  }

  /* ---------- Shows ---------- */

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function parseDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function showRow(show, past) {
    const date = parseDate(show.date);
    let tag;
    if (past) tag = '<span class="tag tag-muted">Past show</span>';
    else if (show.private || !show.tickets) tag = `<span class="tag tag-yellow">${show.private ? 'Private event' : 'Free / at the door'}</span>`;
    else tag = `<a class="btn btn-orange" href="${esc(show.tickets)}" target="_blank" rel="noopener">Get tickets</a>`;

    return `
      <li class="show card${past ? ' show-past' : ''}">
        <div class="date-badge" aria-label="${date.toDateString()}">
          <span class="month">${MONTHS[date.getMonth()]}</span>
          <span class="day">${date.getDate()}</span>
          <span class="year">${date.getFullYear()}</span>
        </div>
        <div class="show-info">
          <h3>${esc(show.title)}</h3>
          <p class="show-venue">${esc(show.venue)} · ${esc(show.city)}</p>
          <p class="show-meta">${[show.time, show.price].filter(Boolean).map(esc).join(' · ')}</p>
        </div>
        ${
          show.poster
            ? `<a class="show-poster" href="${esc(show.poster)}" target="_blank" rel="noopener" aria-label="View poster for ${esc(show.title)}"><img src="${esc(show.poster)}" alt="Poster for ${esc(show.title)}" loading="lazy"></a>`
            : ''
        }
        <div class="show-action">${tag}</div>
      </li>`;
  }

  function renderShows() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const shows = (DATA.shows || []).slice().sort((a, b) => parseDate(a.date) - parseDate(b.date));
    const upcoming = shows.filter((s) => parseDate(s.date) >= today);
    const past = shows.filter((s) => parseDate(s.date) < today).reverse();

    document.querySelectorAll('[data-shows]').forEach((host) => {
      const isPast = host.dataset.shows === 'past';
      const list = isPast ? past : upcoming;
      const limit = Number(host.dataset.limit) || list.length;
      if (!list.length) {
        host.innerHTML = isPast
          ? ''
          : `<li class="card empty">No public dates right now. <a href="contact.html">Book Nicole for your event →</a></li>`;
        if (isPast) host.closest('section')?.setAttribute('hidden', '');
        return;
      }
      host.innerHTML = list.slice(0, limit).map((s) => showRow(s, isPast)).join('');
    });
  }

  /* ---------- Videos ---------- */

  function renderVideos() {
    document.querySelectorAll('[data-videos]').forEach((host) => {
      const limit = Number(host.dataset.limit) || Infinity;
      host.innerHTML = (DATA.videos || [])
        .slice(0, limit)
        .map((v, i) => {
          const id = (v.youtube || '').trim();
          let media;
          let frameClass = 'video-frame';
          if (id) {
            media = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}" title="${esc(v.title)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
          } else if (v.thumb) {
            frameClass += ' video-thumb';
            media = `<img src="${esc(v.thumb)}" alt="Still from Nicole’s “${esc(v.title)}” clip" loading="lazy">
              <span class="sticker thumb-tag ${i % 2 ? 'sticker-orange' : ''}">Full clip soon</span>`;
          } else {
            media = `<div class="coming-soon ${i % 2 ? 'cs-orange' : 'cs-yellow'}"><span class="play" aria-hidden="true">▶</span><span>Coming soon</span></div>`;
          }
          return `<li class="video card"><div class="${frameClass}">${media}</div><h3>${esc(v.title)}</h3></li>`;
        })
        .join('');
    });
  }

  /* ---------- Testimonials ---------- */

  function renderTestimonials() {
    document.querySelectorAll('[data-testimonials]').forEach((host) => {
      const limit = Number(host.dataset.limit) || Infinity;
      host.innerHTML = (DATA.testimonials || [])
        .slice(0, limit)
        .map(
          (t, i) => `
          <li class="quote card ${['', 'quote-yellow', 'quote-tilt'][i % 3]}">
            ${t.sample ? '<span class="sample-tag" title="Placeholder: replace with a real client quote">Sample</span>' : ''}
            <blockquote><p>${esc(t.quote)}</p></blockquote>
            <p class="quote-by"><strong>${esc(t.name)}</strong><br>${esc(t.role)}, ${esc(t.company)}</p>
          </li>`
        )
        .join('');
    });
  }

  /* ---------- Gallery ---------- */

  function renderGallery() {
    document.querySelectorAll('[data-gallery]').forEach((host) => {
      const items = DATA.gallery || [];
      if (!items.length) {
        host.closest('section')?.setAttribute('hidden', '');
        return;
      }
      host.innerHTML = items
        .map((g, i) => `<li class="gallery-item tilt-${i % 3}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy"></li>`)
        .join('');
    });
  }

  /* ---------- Photos: fall back to placeholder if the real file is missing ---------- */

  function wirePhotos() {
    document.querySelectorAll('img[data-fallback]').forEach((img) => {
      const fallback = () => {
        if (!img.src.endsWith('placeholder.svg')) img.src = 'images/placeholder.svg';
      };
      img.addEventListener('error', fallback);
      if (img.complete && img.naturalWidth === 0) fallback();
    });
  }

  renderHeader();
  renderFooter();
  wirePhotos();
  renderBookingForms();
  renderShows();
  renderVideos();
  renderTestimonials();
  renderGallery();
})();
