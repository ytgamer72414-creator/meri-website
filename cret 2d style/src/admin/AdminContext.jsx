import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

// ── Default data ─────────────────────────────────────────────────────────────
const DEFAULT_COLORS = {
  bg: '#FDF8EE',
  dark: '#0A192F',
  yellow: '#FFC900',
  orange: '#FF7051',
  green: '#60E596',
  blue: '#0A32BF',
};

const DEFAULT_REVIEWS = [
  { id: 1, stars: 5, text: "Klyrex turned a dry product update into the highest-performing video we've ever shipped. 4M views in two weeks.", author: 'Maya Chen', role: 'Head of Marketing, Linra', color: '#FFC900', textLight: false },
  { id: 2, stars: 5, text: "Genuinely the most talented 2D animation team we've ever hired. The motion system feels iconic.", author: 'Priya Raghavan', role: 'Creative Director, Halo Beauty', color: '#FF7051', textLight: false },
  { id: 3, stars: 5, text: "Klyrex built a year of content in a quarter and somehow made every single piece feel hand-crafted.", author: 'Aïcha Bensalem', role: 'Marketing Lead, Verde Coffee', color: '#0A32BF', textLight: true },
  { id: 4, stars: 5, text: "These folks ship fast and think like a brand team, not a vendor. Our explainer doubled trial signups.", author: 'Diego Alvarez', role: 'Product Lead, Stack', color: '#60E596', textLight: false },
  { id: 5, stars: 5, text: "Our SaaS demo finally clicks. Sales started leading calls with the video and never looked back.", author: 'Jonas Weber', role: 'VP Product, Helmstack', color: '#ffffff', textLight: false },
  { id: 6, stars: 5, text: "From script to final cut, the bar they hold themselves to is unreal. Worth every dollar.", author: 'Ravi Patel', role: 'Co-founder, Knotch.ai', color: '#ffffff', textLight: false },
];

const DEFAULT_VIDEOS = [
  { id: 1, title: 'Motion Graphics Showreel', category: 'motion-graphics', url: '', thumbnail: '', description: 'Our best motion graphics work of 2024.' },
  { id: 2, title: 'Short Form Reel Pack', category: 'short-form-reels', url: '', thumbnail: '', description: 'Hyper-engaging 9:16 content.' },
];

const DEFAULT_STATS = {
  projects: '180+',
  views: '42M+',
  brands: '38',
  inhouse: '100%',
};

const DEFAULT_HERO = {
  tagline: 'CREATIVE AGENCY - EST. 2021',
  headline1: 'We make',
  highlight1: 'motion',
  headline2: 'that makes',
  highlight2: 'people stop.',
  subtext: "Klyrex Media is a creative agency for brands that refuse to be boring. Reels, films, motion systems & SaaS explainers — all crafted in-house.",
};

const DEFAULT_PRICING = [
  { id: 1, title: 'Reels & Shorts', price: '$100', period: '', subtitle: 'Starting from', features: 'Up to 60 seconds\nSnappy cuts + on-beat pacing\nDynamic captions & trendy effects\nBasic color grade + sound polish\n2 revision rounds\nDefault Raw file export\n→ "Perfect for creators who want scroll-stopping short-form edits."', isPopular: false, bgColor: '#FDFBF7', textColor: 'var(--col-dark)' },
  { id: 2, title: 'Long Format', price: '$500', period: '', subtitle: '(YouTube / Interviews / Podcasts)\nStarting from', features: 'Up to 10-15 minutes\nMulti-cam sync & clean transitions\nColor correction & light grading\nAudio cleanup + background music\n2-3 revisions\nThumbnail included (optional)\n→ "For creators who want polished storytelling that holds attention."', isPopular: true, bgColor: 'var(--col-yellow)', textColor: 'var(--col-dark)' },
  { id: 3, title: 'Motion Graphics/SaaS', price: '$1,500', period: '', subtitle: 'Starting from', features: 'Logo animations / lower thirds / infographics\nText animations & visual effects\nSound design + music sync\n2-3 revisions\n4K export quality\n→ "Ideal for brands and creators who want their visuals to pop."', isPopular: false, bgColor: 'var(--col-dark)', textColor: 'white' }
];

const DEFAULT_CONTACT = {
  whatsapp: '919756289688',
  email: 'Klyrexmedia@gmail.com'
};

// ── Storage helpers ───────────────────────────────────────────────────────────
function load(key, fallback) {
  try {
    const v = localStorage.getItem(`klyrex_admin_${key}`);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function save(key, value) {
  localStorage.setItem(`klyrex_admin_${key}`, JSON.stringify(value));
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem('klyrex_admin_auth'));
  const [colors, setColorsState] = useState(() => load('colors', DEFAULT_COLORS));
  const [reviews, setReviewsState] = useState(() => load('reviews', DEFAULT_REVIEWS));
  const [videos, setVideosState] = useState(() => load('videos', DEFAULT_VIDEOS));
  const [stats, setStatsState] = useState(() => load('stats', DEFAULT_STATS));
  const [hero, setHeroState] = useState(() => load('hero', DEFAULT_HERO));
  const [pricing, setPricingState] = useState(() => load('pricing_v2', DEFAULT_PRICING));
  const [contactInfo, setContactInfoState] = useState(() => load('contact', DEFAULT_CONTACT));

  // Apply CSS vars whenever colors change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--col-bg', colors.bg);
    root.style.setProperty('--col-dark', colors.dark);
    root.style.setProperty('--col-yellow', colors.yellow);
    root.style.setProperty('--col-orange', colors.orange);
    root.style.setProperty('--col-green', colors.green);
    root.style.setProperty('--col-blue', colors.blue);
    document.body.style.backgroundColor = colors.bg;
    document.body.style.color = colors.dark;
  }, [colors]);

  const login = (email, password) => {
    const emailLower = email.toLowerCase().trim();
    if (emailLower === 'klyrexmedia@gmail.com' && (password === 'klyrex@098' || password === 'Klyrex@098')) {
      sessionStorage.setItem('klyrex_admin_auth', '1');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('klyrex_admin_auth');
    setIsLoggedIn(false);
  };

  const updateColors = (c) => { setColorsState(c); save('colors', c); };
  const updateReviews = (r) => { setReviewsState(r); save('reviews', r); };
  const updateVideos = (v) => { setVideosState(v); save('videos', v); };
  const updateStats = (s) => { setStatsState(s); save('stats', s); };
  const updateHero = (h) => { setHeroState(h); save('hero', h); };
  const updatePricing = (p) => { setPricingState(p); save('pricing_v2', p); };
  const updateContactInfo = (c) => { setContactInfoState(c); save('contact', c); };

  const addReview = (rev) => {
    const updated = [...reviews, { ...rev, id: Date.now() }];
    updateReviews(updated);
  };
  const deleteReview = (id) => updateReviews(reviews.filter(r => r.id !== id));

  const addVideo = (vid) => {
    const updated = [...videos, { ...vid, id: Date.now() }];
    updateVideos(updated);
  };
  const deleteVideo = (id) => updateVideos(videos.filter(v => v.id !== id));
  const updateVideo = (id, newVid) => {
    updateVideos(videos.map(v => v.id === id ? { ...newVid, id } : v));
  };

  const resetAll = () => {
    updateColors(DEFAULT_COLORS);
    updateReviews(DEFAULT_REVIEWS);
    updateVideos(DEFAULT_VIDEOS);
    updateStats(DEFAULT_STATS);
    updateHero(DEFAULT_HERO);
    updatePricing(DEFAULT_PRICING);
    updateContactInfo(DEFAULT_CONTACT);
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout,
      colors, updateColors,
      reviews, addReview, deleteReview, updateReviews,
      videos, addVideo, deleteVideo, updateVideo, updateVideos,
      stats, updateStats,
      hero, updateHero,
      pricing, updatePricing,
      contactInfo, updateContactInfo,
      resetAll,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}

export { DEFAULT_COLORS, DEFAULT_REVIEWS, DEFAULT_VIDEOS, DEFAULT_STATS, DEFAULT_HERO, DEFAULT_PRICING, DEFAULT_CONTACT };
