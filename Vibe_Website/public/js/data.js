/*
 * SITE CONTENT: edit this file to update shows, videos and testimonials.
 * No other code changes needed.
 */
window.SITE_DATA = {
  // Paste Nicole's links here; empty ones are hidden.
  social: {
    instagram: '', // e.g. 'https://www.instagram.com/<handle>/'
    youtube: '',
    tiktok: '',
  },

  // Shows: date is YYYY-MM-DD. Past dates move to "Past shows" automatically.
  // Leave "tickets" empty and set private: true for private/corporate events.
  shows: [
    {
      date: '2026-12-31',
      time: '7:00 PM',
      title: 'Nicole Tran New Year’s Eve Comedy',
      venue: 'Historic Bal Theatre',
      city: 'San Leandro, CA',
      price: '$40',
      tickets: 'https://baltheatre.com',
      poster: 'images/poster-nye-bal-theatre.jpg',
    },
    {
      date: '2026-10-03',
      time: 'Dinner 6 PM · Show 8 PM',
      title: 'Standup & Sushi (Peninsula Comedy)',
      venue: 'Barracuda Sushi, 347 Primrose Rd',
      city: 'Burlingame, CA',
      price: 'Free · 21+',
      tickets: '',
      poster: 'images/poster-standup-sushi.jpg',
    },
  ],

  // Videos: paste the YouTube video ID (the part after "v=") into "youtube".
  // Clips without an ID show their thumbnail (or a "Coming soon" tile) instead of a player.
  videos: [
    { title: 'My 2003 Car', youtube: '', thumb: 'images/clip-2003-car.jpg' },
    { title: 'I Drive 100 Miles Per Hour', youtube: '', thumb: 'images/clip-100-mph.jpg' },
    { title: 'Car Race: I Need to Win the Lottery', youtube: '', thumb: 'images/clip-car-race.jpg' },
    { title: 'Date A…', youtube: '', thumb: 'images/clip-date-a.jpg' },
    { title: 'Miss Pronounce', youtube: '', thumb: 'images/clip-miss-pronounce.jpg' },
    { title: 'English as a Second Language', youtube: '', thumb: 'images/clip-english-second.jpg' },
    { title: 'Beef Chao Fun', youtube: '', thumb: 'images/clip-beef-chao-fun.jpg' },
    { title: 'New York', youtube: '', thumb: 'images/clip-new-york.jpg' },
    { title: 'Clint Eastwood', youtube: '', thumb: 'images/clip-clint-eastwood.jpg' },
  ],

  // Photo gallery on the About page.
  gallery: [
    { src: 'images/gallery-uh-huh.jpg', alt: 'Nicole in a sparkly maroon top and statement necklace, mid-story' },
    { src: 'images/gallery-pink.jpg', alt: 'Nicole in a pink top under her signature sandwich graphic' },
    { src: 'images/gallery-just.jpg', alt: 'Nicole snacking on fries while telling a joke' },
  ],

  // SAMPLE testimonials: replace with real client quotes before launch.
  // Remove "sample: true" once a quote is real.
  testimonials: [
    { quote: 'Our holiday party has never been this loud. People were still quoting her jokes in Monday stand-up.', name: 'Client name', role: 'People Ops Lead', company: 'Tech company', sample: true },
    { quote: 'Clean, sharp and completely custom. She roasted our quarterly metrics and the CFO laughed hardest.', name: 'Client name', role: 'Events Manager', company: 'Financial services', sample: true },
    { quote: 'She kept a 6-hour conference on schedule AND made it fun. Best emcee we have hired.', name: 'Client name', role: 'Conference Director', company: 'Industry association', sample: true },
    { quote: 'Zero awkward moments, 100% laughs. HR sent me a thank-you note.', name: 'Client name', role: 'Office Manager', company: 'Law firm', sample: true },
    { quote: 'She talked with our team before the show and worked our inside jokes into her set. Brilliant.', name: 'Client name', role: 'Head of Culture', company: 'Startup', sample: true },
    { quote: 'Our awards night finally had energy. Easy to work with from first call to curtain.', name: 'Client name', role: 'Marketing Director', company: 'Healthcare company', sample: true },
  ],
};
