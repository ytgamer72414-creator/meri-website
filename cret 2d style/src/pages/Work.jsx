import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Film, MonitorPlay, PenTool, Layers, ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../admin/AdminContext';

const CATEGORIES = [
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    color: 'var(--col-yellow)',
    icon: Sparkles,
    btnDark: true,
    textLight: false
  },
  {
    id: 'short-form-reels',
    title: 'Short-form Reels',
    color: 'var(--col-orange)',
    icon: Zap,
    btnDark: false,
    textLight: false
  },
  {
    id: 'long-form-video',
    title: 'Long-form Video',
    color: '#6EE7B7',
    icon: Film,
    btnDark: true,
    textLight: false
  },
  {
    id: 'saas-explainers',
    title: 'SaaS Explainers',
    color: 'var(--col-blue)',
    icon: MonitorPlay,
    btnDark: false,
    textLight: true
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    color: '#6EE7B7',
    icon: PenTool,
    btnDark: true,
    textLight: false
  },
  {
    id: 'company-branding',
    title: 'Company Branding',
    color: 'var(--col-blue)',
    icon: Layers,
    btnDark: false,
    textLight: true
  }
];

const Work = () => {
  const navigate = useNavigate();
  const { videos } = useAdmin();

  return (
    <div className="work-page" style={{ padding: '6rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header section */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'inline-block', border: '1px solid var(--col-dark)', borderRadius: '9999px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem', background: 'transparent' }}>
          <span style={{ color: 'var(--col-orange)' }}>●</span> PORTFOLIO
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.9, marginBottom: '0.5rem', color: 'var(--col-dark)', letterSpacing: '-0.03em' }}>
          Pick a category.
        </h1>
        <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, marginBottom: '2rem', color: 'var(--col-orange)', fontStyle: 'italic', fontWeight: 600 }}>
          Press play.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', fontWeight: 500, marginTop: '1rem' }}>
          A playground of pixel-perfect motion. Select a discipline and witness the craft.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          // ── Auto count: uploaded videos in this category ──────────────────
          const count = videos.filter(v => v.category === cat.id).length;
          const projectLabel = count === 0 ? 'NO PROJECTS YET' : `${count} ${count === 1 ? 'PROJECT' : 'PROJECTS'}`;

          return (
            <div 
              key={cat.id} 
              className="card-2d"
              onClick={() => navigate(`/portfolio/${cat.id}`)}
              style={{ 
                backgroundColor: cat.color, 
                color: cat.textLight ? 'white' : 'var(--col-dark)',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                border: '4px solid var(--col-dark)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  <IconComponent size={28} strokeWidth={2.5} color={cat.textLight ? 'white' : 'var(--col-dark)'} />
                </span>
                <div style={{ 
                  width: 48, height: 48, borderRadius: '50%', 
                  backgroundColor: cat.btnDark ? 'var(--col-dark)' : 'white',
                  border: '2px solid var(--col-dark)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cat.btnDark ? 'white' : 'var(--col-dark)',
                  transition: 'transform 0.2s ease',
                }}>
                  <ArrowUpRight size={20} strokeWidth={2} />
                </div>
              </div>
              
              <div style={{ marginTop: 'auto' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  {projectLabel}
                </p>
                <h2 style={{ fontSize: '2.8rem', letterSpacing: '-0.03em', lineHeight: 1, fontWeight: 800 }}>{cat.title}</h2>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default Work;
