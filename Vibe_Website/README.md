# Nicole Tran: Comedy Booking Website

Brutalist Pop website for comedian & host Nicole Tran. Goal: corporate bookings.

## Run it

```bash
npm install
cp .env.example .env     # then set ADMIN_TOKEN (and MONGODB_URI if you have one)
npm start                # http://localhost:3000
```

Use `npm run dev` to auto-restart on server changes.

## Pages

| Page | File |
|---|---|
| Home | `public/index.html` |
| About | `public/about.html` |
| Videos | `public/videos.html` |
| Shows | `public/shows.html` |
| Testimonials | `public/testimonials.html` |
| Contact / booking | `public/contact.html` |
| Owner-only booking inbox | `public/admin.html` (needs `ADMIN_TOKEN`) |

## Booking requests

- The form (Home + Contact) is checked in the browser **and** on the server (`server.js`).
- Requests are saved to **MongoDB** when `MONGODB_URI` is set, otherwise to `data/bookings.json`.
- Only the owner can read them: open `/admin.html` and enter the `ADMIN_TOKEN` password.
- Spam protection: hidden honeypot field + 5 requests per 10 minutes per visitor.

## Editing content

Everything changeable lives in **`public/js/data.js`**:

- **Shows:** add `{ date: 'YYYY-MM-DD', ... }`. Past dates move to "Past shows" automatically.
- **Videos:** paste the YouTube ID into `youtube: ''`. Empty ones show "Coming soon".
- **Testimonials:** currently **samples**. Replace with real client quotes and remove `sample: true`.
- **Social links:** fill in `social.instagram` etc. to show them in the footer.

**Photos:** the current images in `public/images/` were cropped from a screenshot of Nicole's Instagram grid,
so they are low resolution (~220px wide). Replace them with the original photos/video stills at the same file names:
`nicole-stage.jpg` (home hero), `nicole-portrait.jpg` (about), `gallery-*.jpg` (about gallery),
`clip-*.jpg` (video thumbnails), `poster-*.jpg` (show posters). Portrait (4:5) photos look best.
If a hero/portrait file is missing, a "Photo coming soon" placeholder shows.

## Before launch: check with Nicole

- [ ] Full-resolution photos (current ones are cropped from an Instagram screenshot) and OK to use them
- [ ] Bio on the About page (draft written from her Instagram content)
- [ ] Stats: 10+ years / 300+ corporate events / 100% HR-approved
- [ ] Real testimonials (remove all `sample: true`)
- [ ] YouTube links for the videos
- [ ] Show details (venue city for Historic Bal Theatre assumed San Leandro, CA)
- [ ] "As seen at" venues on the home page
