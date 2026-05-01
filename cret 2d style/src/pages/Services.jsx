import React from 'react';

import { Sparkles, Zap, Film, MonitorPlay, PenTool, Layers } from 'lucide-react';

const services = [
  { 
    id: 1, 
    title: 'Motion Graphics', 
    desc: 'Kinetic typography and fluid visual systems that breathe life into brands. Pure, unfiltered motion that refuses to be ignored.', 
    color: 'var(--col-yellow)',
    icon: Sparkles
  },
  { 
    id: 2, 
    title: 'Short-form Reels', 
    desc: 'Hyper-engaging 9:16 cuts engineered to dominate timelines, hijack attention, and convert scrolling into undeniable action.', 
    color: 'var(--col-orange)',
    icon: Zap
  },
  { 
    id: 3, 
    title: 'Long-form Video', 
    desc: 'Cinematic storytelling, brand documentaries, and narrative-driven mastery that keeps audiences glued to the screen.', 
    color: 'var(--col-green)',
    icon: Film
  },
  { 
    id: 4, 
    title: 'SaaS Explainers', 
    desc: 'Turning complex software into effortless, "aha!" moments through slick motion and brilliantly intuitive UI storytelling.', 
    color: 'var(--col-blue)',
    textLight: true,
    icon: MonitorPlay
  },
  { 
    id: 5, 
    title: 'Graphic Design', 
    desc: 'Bold visual identities, striking posters, and editorial design with teeth. We make layouts that leave a permanent mark.', 
    color: 'var(--col-green)',
    icon: PenTool
  },
  { 
    id: 6, 
    title: 'Company Branding', 
    desc: 'Future-proof logo systems and comprehensive brand bibles. We engineer visual identities designed to outlast the trends.', 
    color: 'var(--col-orange)',
    icon: Layers
  }
];

const Services = () => {
  return (
    <div className="services-page">
      <div className="services-hero" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', border: '2px solid var(--col-dark)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '2rem', background: 'white' }}>
          <span style={{ color: 'var(--col-orange)' }}>●</span> WHAT WE DO
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--col-dark)' }}>
          Six ways we make<br/>
          your brand <span style={{ color: 'var(--col-orange)', fontStyle: 'italic' }}>unforgettable.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', lineHeight: 1.6 }}>
          From the first keyframe to final delivery — every asset is meticulously crafted by our elite in-house team. No compromises.
        </p>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {services.map((svc) => (
          <div 
            key={svc.id} 
            className="card-2d" 
            style={{ 
              backgroundColor: svc.color, 
              color: svc.textLight ? 'white' : 'var(--col-dark)',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: svc.textLight ? 'white' : 'transparent', border: '2px solid var(--col-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--col-dark)', marginBottom: 'auto' 
            }}>
              <svc.icon size={20} strokeWidth={2.5} color={svc.textLight ? 'var(--col-dark)' : 'var(--col-dark)'} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', marginTop: '2rem' }}>{svc.title}</h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.5, opacity: 0.9 }}>{svc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
