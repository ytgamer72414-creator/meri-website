import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play } from 'lucide-react';
import { useAdmin } from '../admin/AdminContext';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

// ── Frame-by-frame animation player ──────────────────────────────────────────
const TOTAL_FRAMES = 172;
const FPS = 20; // playback speed

const FrameAnimation = () => {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const rafRef    = useRef(null);
  const currentRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const images = [];
    let loaded = 0;

    const startAnimation = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const interval = 1000 / FPS;

      // Set canvas size from first frame
      const first = framesRef.current[0];
      canvas.width  = first.naturalWidth;
      canvas.height = first.naturalHeight;

      const tick = (timestamp) => {
        if (timestamp - lastTimeRef.current >= interval) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(framesRef.current[currentRef.current], 0, 0);
          currentRef.current = (currentRef.current + 1) % TOTAL_FRAMES;
          lastTimeRef.current = timestamp;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(5, '0');
      img.src = `/video/frame_00020_${num}.png`;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          framesRef.current = images;
          startAnimation();
        }
      };
      images.push(img);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="frame-anim-wrapper">
      <canvas ref={canvasRef} className="frame-anim-canvas" />
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const categories = [
  { id: 'motion-graphics', title: 'Motion Graphics', desc: 'Kinetic typography and fluid visual systems that breathe life into brands.', color: 'var(--col-yellow)', type: 'motion-graphics' },
  { id: 'short-form-reels', title: 'Short-form Reels', desc: 'Hyper-engaging 9:16 cuts engineered to dominate timelines and convert.', color: 'var(--col-orange)', type: 'short-form-reels' },
  { id: 'long-form-video', title: 'Long-form Video', desc: 'Cinematic storytelling, documentaries, and branded narratives with soul.', color: 'var(--col-green)', hasVideoIcon: true, type: 'long-form-video' },
  { id: 'saas-explainers', title: 'SaaS Explainers', desc: 'Turning complex software into effortless, "aha!" moments through motion.', color: 'var(--col-blue)', textLight: true, type: 'saas-explainers' },
  { id: 'graphic-design', title: 'Graphic Design', desc: 'Bold visual identities, striking posters, and editorial design with teeth.', color: '#7CE0B1', type: 'graphic-design' },
  { id: 'company-branding', title: 'Company Branding', desc: 'Future-proof logo systems and brand bibles built for the modern era.', color: '#FF7F5A', type: 'company-branding' }
];

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const { reviews, stats, hero, addReview } = useAdmin();

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', role: '', stars: 5, text: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({
      ...newReview,
      color: '#F4F1ED', // Neutral bright color for client reviews
      textLight: false
    });
    setShowForm(false);
    setNewReview({ author: '', role: '', stars: 5, text: '' });
    alert("Thank you! Your review has been submitted.");
  };

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current.querySelectorAll('.animate-up'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    // Cards scroll animation
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)"
        }
      );
    });
  }, []);

  const handleCategoryClick = (id) => {
    navigate(`/portfolio/${id}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-tag animate-up">
          <span className="dot"></span> {hero.tagline}
        </div>
        <h1 className="hero-headline animate-up">
          {hero.headline1} <span className="highlight-tag">{hero.highlight1}</span><br />
          {hero.headline2} <span className="highlight-text">{hero.highlight2}</span>
        </h1>
        <div className="hero-subtext animate-up">
          <p>{hero.subtext}</p>
          <div className="hero-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/work')}>
              See our work <ArrowUpRight size={16} />
            </button>
            <button className="btn btn-white" onClick={() => window.open('https://wa.me/919756289688', '_blank')}>
              <Play size={16} fill="currentColor" /> Start a project
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>{stats.projects}</h3>
            <p>Projects shipped</p>
          </div>
          <div className="stat-item">
            <h3>{stats.views}</h3>
            <p>Views generated</p>
          </div>
          <div className="stat-item">
            <h3>{stats.brands}</h3>
            <p>Happy brands</p>
          </div>
          <div className="stat-item">
            <h3>{stats.inhouse}</h3>
            <p>In-house animation</p>
          </div>
        </div>
      </section>

      {/* Ticker Section */}
      <div className="ticker-wrapper">
        <div className="ticker-track">
          <div className="ticker-content">
            {/* Repeated for seamless scrolling */}
            <span>⭐ Explainers</span><span>⭐ Branding</span><span>⭐ Storytelling</span><span>⭐ Animation</span><span>⭐ Motion Graph</span>
            <span>⭐ Explainers</span><span>⭐ Branding</span><span>⭐ Storytelling</span><span>⭐ Animation</span><span>⭐ Motion Graph</span>
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <section className="showcase-section">
        <div className="showcase-header">
          <div className="showcase-title">
            <span className="pre-title">our playground</span>
            <h2>Pick a flavour.<br/>Watch it move.</h2>
          </div>
          <div className="showcase-desc">
            Four categories, one studio. Tap any card to dive into the reel.
          </div>
        </div>

        <div className="grid-showcase">
          {categories.map((cat, i) => (
            <div 
              key={cat.id} 
              className={`card-2d showcase-card ${cat.textLight ? 'text-light' : ''}`}
              style={{ backgroundColor: cat.color }}
              ref={el => cardsRef.current[i] = el}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.type === 'motion-graphics' && (
                <div className="card-gfx motion-graphics-gfx">
                  <div className="gfx-blue-circle"></div>
                  <div className="gfx-pill-dark-1"></div>
                  <div className="gfx-pill-dark-2"></div>
                  <div className="gfx-wave-line">
                    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 20 Q 30 0, 60 20 T 120 20" stroke="var(--col-blue)" strokeWidth="6" strokeLinecap="round" fill="none"/>
                    </svg>
                    <div className="gfx-orange-dot"></div>
                  </div>
                </div>
              )}
              {cat.type === 'short-form-reels' && (
                <div className="card-gfx short-form-reels-gfx">
                  <div className="gfx-phone">
                    <div className="gfx-play-circle">
                      <Play fill="white" size={20} color="white" />
                    </div>
                  </div>
                  <div className="gfx-chevron"></div>
                </div>
              )}
              {cat.type === 'long-form-video' && (
                <div className="card-gfx long-form-video-gfx">
                  <div className="gfx-monitor">
                    <div className="gfx-monitor-screen">
                      <Play fill="var(--col-blue)" stroke="var(--col-blue)" size={32} />
                    </div>
                    <div className="gfx-monitor-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              )}
              {cat.type === 'saas-explainers' && (
                <div className="card-gfx saas-explainers-gfx">
                  <div className="gfx-browser">
                    <div className="gfx-browser-top">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="gfx-browser-body">
                      <div className="gfx-browser-box-blue"></div>
                      <div className="gfx-browser-pills">
                        <div className="gfx-browser-pill-red"></div>
                        <div className="gfx-browser-pill-green"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {cat.type === 'graphic-design' && (
                <div className="card-gfx graphic-design-gfx">
                  <div className="gfx-paper">
                    <div className="gfx-circle-blue"></div>
                  </div>
                  <div className="gfx-brown-box"></div>
                </div>
              )}
              {cat.type === 'company-branding' && (
                <div className="card-gfx company-branding-gfx">
                  <div className="gfx-logo-circle">K</div>
                  <div className="gfx-yellow-box"></div>
                  <div className="gfx-pill-1"></div>
                  <div className="gfx-pill-2"></div>
                </div>
              )}
              <div className="card-top">
                <span className="category-badge">📺 CATEGORY</span>
                <button className="card-arrow-btn"><ArrowUpRight size={20} /></button>
              </div>
              <div className="card-bottom">
                <h3>{cat.title} {cat.hasVideoIcon && <Play fill="currentColor" />}</h3>
                <p>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frame Animation — below category cards, above How We Work */}
      <FrameAnimation />

      {/* How We Work Section — blue line acts as road for the car */}
      <section style={{ backgroundColor: '#002B99', color: 'white', padding: '6rem 2rem', margin: '0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'cursive, "Outfit"', color: 'var(--col-yellow)', fontSize: '1.2rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
            how we work
          </p>
          <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', marginBottom: '4rem', letterSpacing: '-0.03em' }}>
            From spark to <span style={{ color: 'var(--col-yellow)' }}>screen.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { num: '01', title: 'Discover', desc: 'We dive deep into your brand\'s DNA to uncover insights that actually matter.' },
              { num: '02', title: 'Concept', desc: 'Crafting bold style frames, gripping storyboards, and a razor-sharp creative vision.' },
              { num: '03', title: 'Animate', desc: 'Where the magic happens. Fluid motion, bespoke sound design, and kinetic typography.' },
              { num: '04', title: 'Deliver', desc: 'Pixel-perfect assets and a strategic rollout plan designed for maximum impact.' }
            ].map((step) => (
              <div key={step.num} style={{ 
                border: '1px solid rgba(255,255,255,0.15)', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem',
                backgroundColor: 'rgba(255,255,255,0.03)'
              }}>
                <div style={{ color: 'var(--col-yellow)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.05em' }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Reviews Ticker Section */}
      <section className="visual-reviews-section">
        <div className="reviews-marquee">
          <div className="reviews-track">
            {[...reviews, ...reviews].map((review, i) => (
              <div 
                key={i} 
                className="card-2d review-card"
                style={{ backgroundColor: review.color, color: review.textLight ? 'white' : 'var(--col-dark)' }}
              >
                <div className="review-stars">
                  {'★'.repeat(review.stars)}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-divider" style={{ backgroundColor: review.textLight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}></div>
                <div className="review-author-info">
                  <h4>{review.author}</h4>
                  <p>{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actions & Admin shortcut */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        
        <button 
          onClick={() => setShowForm(!showForm)} 
          style={{ 
            padding: '0.8rem 1.5rem', fontSize: '1rem', background: 'var(--col-blue)', 
            color: 'white', border: '2px solid var(--col-dark)', borderRadius: '8px', 
            cursor: 'pointer', fontWeight: 600
          }}
        >
          {showForm ? 'Cancel' : 'Add a Review'}
        </button>

        {showForm && (
         <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '16px', border: '2px solid var(--col-dark)', boxShadow: '4px 4px 0px var(--col-dark)', textAlign: 'left' }}>
           <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Write a Review</h3>
           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <input type="text" placeholder="Your Name" required value={newReview.author} onChange={e => setNewReview({...newReview, author: e.target.value})} style={{ padding: '0.8rem', border: '2px solid var(--col-dark)', borderRadius: '8px', fontFamily: 'inherit' }} />
             <input type="text" placeholder="Your Role / Company" required value={newReview.role} onChange={e => setNewReview({...newReview, role: e.target.value})} style={{ padding: '0.8rem', border: '2px solid var(--col-dark)', borderRadius: '8px', fontFamily: 'inherit' }} />
             <select value={newReview.stars} onChange={e => setNewReview({...newReview, stars: parseInt(e.target.value)})} style={{ padding: '0.8rem', border: '2px solid var(--col-dark)', borderRadius: '8px', fontFamily: 'inherit', cursor: 'pointer' }}>
               <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
               <option value={4}>4 Stars ⭐⭐⭐⭐</option>
               <option value={3}>3 Stars ⭐⭐⭐</option>
               <option value={2}>2 Stars ⭐⭐</option>
               <option value={1}>1 Star ⭐</option>
             </select>
             <textarea placeholder="Your honest review..." required value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})} style={{ padding: '0.8rem', border: '2px solid var(--col-dark)', borderRadius: '8px', minHeight: '120px', resize: 'vertical', fontFamily: 'inherit' }}></textarea>
             <button type="submit" style={{ padding: '1rem', background: 'var(--col-orange)', color: 'white', border: '2px solid var(--col-dark)', borderRadius: '8px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', textAlign: 'center' }}>
               Submit Review
             </button>
           </form>
         </div>
       )}


      </div>

    </div>
  );
};

export default Home;
