import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import {
  LogOut, Palette, Star, Video, BarChart2, Edit3, Trash2, Plus,
  Save, RotateCcw, Monitor, Home, ChevronRight, CheckCircle, X,
  Eye, Globe, Settings, Image, DollarSign
} from 'lucide-react';
import './admin.css';

// ── Toast notification ─────────────────────────────────────────────────────
const Toast = ({ msg, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="admin-toast">
      <CheckCircle size={18} color="#60E596" />
      <span>{msg}</span>
      <button onClick={onClose} className="admin-toast-close"><X size={14} /></button>
    </div>
  );
};

// ── Section header ─────────────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="ap-section-header">
    <div className="ap-section-icon"><Icon size={22} /></div>
    <div>
      <h2 className="ap-section-title">{title}</h2>
      {subtitle && <p className="ap-section-sub">{subtitle}</p>}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// TAB: COLORS
// ══════════════════════════════════════════════════════════════════════════════
const ColorsTab = ({ toast }) => {
  const { colors, updateColors } = useAdmin();
  const [local, setLocal] = useState({ ...colors });

  const colorDefs = [
    { key: 'bg', label: 'Background Color', desc: 'Main page background' },
    { key: 'dark', label: 'Dark / Text Color', desc: 'Primary text and borders' },
    { key: 'yellow', label: 'Yellow Accent', desc: 'Used in cards, highlights' },
    { key: 'orange', label: 'Orange Accent', desc: 'CTAs and tags' },
    { key: 'green', label: 'Green Accent', desc: 'Portfolio cards, stat cards' },
    { key: 'blue', label: 'Blue Accent', desc: 'Dark cards and info sections' },
  ];

  const handleSave = () => {
    updateColors(local);
    toast('Color palette saved & applied live!');
  };

  const handleReset = () => {
    import('./AdminContext').then(m => {
      setLocal({ ...m.DEFAULT_COLORS });
      updateColors(m.DEFAULT_COLORS);
      toast('Colors reset to defaults.');
    });
  };

  return (
    <div className="ap-tab-content">
      <SectionHeader icon={Palette} title="Color Palette" subtitle="Changes apply live across the entire website instantly." />

      <div className="ap-colors-grid">
        {colorDefs.map(({ key, label, desc }) => (
          <div key={key} className="ap-color-card">
            <div className="ap-color-preview" style={{ backgroundColor: local[key] }}>
              <div className="ap-color-swatch-inner" />
            </div>
            <div className="ap-color-info">
              <label className="ap-color-label">{label}</label>
              <p className="ap-color-desc">{desc}</p>
              <div className="ap-color-input-row">
                <input
                  type="color"
                  value={local[key]}
                  onChange={e => setLocal(prev => ({ ...prev, [key]: e.target.value }))}
                  className="ap-color-picker"
                  title={`Pick ${label}`}
                />
                <input
                  type="text"
                  value={local[key]}
                  onChange={e => setLocal(prev => ({ ...prev, [key]: e.target.value }))}
                  className="ap-color-hex"
                  placeholder="#000000"
                  maxLength={7}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ap-color-preview-bar">
        <div className="ap-preview-label">Live Preview:</div>
        {colorDefs.map(({ key, label }) => (
          <div key={key} className="ap-preview-swatch" style={{ backgroundColor: local[key] }} title={label} />
        ))}
      </div>

      <div className="ap-action-row">
        <button className="ap-btn ap-btn-primary" onClick={handleSave}>
          <Save size={16} /> Save Colors
        </button>
        <button className="ap-btn ap-btn-ghost" onClick={handleReset}>
          <RotateCcw size={16} /> Reset to Default
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// TAB: REVIEWS
// ══════════════════════════════════════════════════════════════════════════════
const ReviewsTab = ({ toast }) => {
  const { reviews, addReview, deleteReview } = useAdmin();
  const [form, setForm] = useState({ stars: 5, text: '', author: '', role: '', color: '#FFC900', textLight: false });
  const [showForm, setShowForm] = useState(false);

  const colorOptions = [
    { label: 'Yellow', value: '#FFC900' },
    { label: 'Orange', value: '#FF7051' },
    { label: 'Green', value: '#60E596' },
    { label: 'Blue (dark)', value: '#0A32BF' },
    { label: 'White', value: '#ffffff' },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.text.trim() || !form.author.trim()) return;
    addReview(form);
    setForm({ stars: 5, text: '', author: '', role: '', color: '#FFC900', textLight: false });
    setShowForm(false);
    toast('Review added successfully!');
  };

  return (
    <div className="ap-tab-content">
      <SectionHeader icon={Star} title="Reviews Manager" subtitle="Add, edit or delete client reviews shown on your website." />

      <div className="ap-reviews-toolbar">
        <span className="ap-count-badge">{reviews.length} reviews</span>
        <button className="ap-btn ap-btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} /> {showForm ? 'Cancel' : 'Add New Review'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="ap-form-card">
          <h3 className="ap-form-title">New Review</h3>
          <form onSubmit={handleAdd} className="ap-review-form">
            <div className="ap-form-row">
              <div className="ap-form-group">
                <label className="ap-label">Author Name *</label>
                <input className="ap-input" placeholder="e.g. John Smith" value={form.author}
                  onChange={e => setForm(p => ({ ...p, author: e.target.value }))} required />
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Role &amp; Company *</label>
                <input className="ap-input" placeholder="e.g. CEO, Acme Inc." value={form.role}
                  onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
              </div>
            </div>
            <div className="ap-form-group">
              <label className="ap-label">Review Text *</label>
              <textarea className="ap-textarea" rows={3} placeholder="Write the client's testimonial..."
                value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} required />
            </div>
            <div className="ap-form-row">
              <div className="ap-form-group">
                <label className="ap-label">Stars</label>
                <select className="ap-input" value={form.stars} onChange={e => setForm(p => ({ ...p, stars: +e.target.value }))}>
                  {[5,4,3,2,1].map(s => <option key={s} value={s}>{s} ★</option>)}
                </select>
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Card Color</label>
                <div className="ap-color-options">
                  {colorOptions.map(opt => (
                    <button key={opt.value} type="button"
                      className={`ap-color-opt ${form.color === opt.value ? 'selected' : ''}`}
                      style={{ backgroundColor: opt.value, border: form.color === opt.value ? '3px solid #0A192F' : '2px solid #ccc' }}
                      title={opt.label}
                      onClick={() => {
                        setForm(p => ({ ...p, color: opt.value, textLight: opt.value === '#0A32BF' }));
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="ap-form-group" style={{ justifyContent: 'flex-end' }}>
                <label className="ap-label">Light Text</label>
                <label className="ap-toggle">
                  <input type="checkbox" checked={form.textLight}
                    onChange={e => setForm(p => ({ ...p, textLight: e.target.checked }))} />
                  <span className="ap-toggle-slider" />
                </label>
              </div>
            </div>
            <div className="ap-action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="ap-btn ap-btn-primary"><Plus size={16} /> Add Review</button>
              <button type="button" className="ap-btn ap-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Review list */}
      <div className="ap-review-list">
        {reviews.length === 0 && (
          <div className="ap-empty">No reviews yet. Add your first one above!</div>
        )}
        {reviews.map((rev) => (
          <div key={rev.id} className="ap-review-item">
            <div className="ap-review-color-dot" style={{ backgroundColor: rev.color, border: '2px solid #ddd' }} />
            <div className="ap-review-body">
              <div className="ap-review-stars">{'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}</div>
              <p className="ap-review-text">"{rev.text.length > 100 ? rev.text.slice(0, 100) + '...' : rev.text}"</p>
              <div className="ap-review-meta">
                <strong>{rev.author}</strong>
                {rev.role && <span className="ap-review-role"> · {rev.role}</span>}
              </div>
            </div>
            <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => {
              deleteReview(rev.id);
              toast('Review deleted.');
            }} title="Delete review">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// TAB: VIDEOS
// ══════════════════════════════════════════════════════════════════════════════
const CATEGORY_CARDS = [
  { id: 'motion-graphics', label: 'Motion Graphics', color: 'var(--col-yellow)', textDark: true },
  { id: 'short-form-reels', label: 'Short-form Reels', color: 'var(--col-orange)', textDark: true },
  { id: 'long-form-video', label: 'Long-form Video', color: 'var(--col-green)', textDark: true },
  { id: 'saas-explainers', label: 'SaaS Explainers', color: 'var(--col-blue)', textDark: false },
  { id: 'graphic-design', label: 'Graphic Design', color: 'var(--col-green)', textDark: true },
  { id: 'company-branding', label: 'Company Branding', color: 'var(--col-blue)', textDark: false }
];

const VideosTab = ({ toast }) => {
  const { videos, addVideo, deleteVideo, updateVideo } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', url: '', thumbnail: '', description: '', tags: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;
    
    if (editingVideoId) {
      updateVideo(editingVideoId, form);
      toast('Video updated successfully!');
    } else {
      addVideo(form);
      toast('Video added & will appear on your site!');
    }
    
    setForm({ title: '', category: selectedCategory, url: '', thumbnail: '', description: '', tags: '' });
    setShowForm(false);
    setEditingVideoId(null);
  };

  const handleCancel = () => {
    setForm({ title: '', category: selectedCategory, url: '', thumbnail: '', description: '', tags: '' });
    setShowForm(false);
    setEditingVideoId(null);
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vmMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`;
    // Google Drive — convert share/view link to preview embed
    const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
    if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    return url;
  };

  // ── VIEW 1: CATEGORY GRID ──
  if (!selectedCategory) {
    return (
      <div className="ap-tab-content">
        <SectionHeader icon={Video} title="Videos Manager" subtitle="Select a category to manage its videos." />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {CATEGORY_CARDS.map(cat => {
            const count = videos.filter(v => v.category === cat.id).length;
            return (
              <div 
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setForm(prev => ({ ...prev, category: cat.id }));
                }}
                style={{
                  backgroundColor: cat.color,
                  color: cat.textDark ? 'var(--col-dark)' : 'white',
                  borderRadius: '16px',
                  padding: '2rem 1.5rem',
                  cursor: 'pointer',
                  border: '3px solid var(--col-dark)',
                  boxShadow: '4px 4px 0px var(--col-dark)',
                  transition: 'transform 0.2s',
                  display: 'flex', flexDirection: 'column', gap: '1rem'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{cat.label}</h3>
                <div style={{
                  background: cat.textDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  alignSelf: 'flex-start', fontSize: '0.85rem', fontWeight: 'bold'
                }}>
                  {count} videos
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── VIEW 2: CATEGORY DETAIL (MANAGE VIDEOS) ──
  const categoryVideos = videos.filter(v => v.category === selectedCategory);
  const currentCategoryLabel = CATEGORY_CARDS.find(c => c.id === selectedCategory)?.label;

  return (
    <div className="ap-tab-content">
      <button 
        onClick={() => {
          setSelectedCategory(null);
          setShowForm(false);
          setEditingVideoId(null);
        }}
        className="ap-btn ap-btn-ghost"
        style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        ← Back to Categories
      </button>
      
      <SectionHeader icon={Video} title={`${currentCategoryLabel} Videos`} subtitle={`Manage videos for ${currentCategoryLabel}.`} />

      <div className="ap-reviews-toolbar">
        <span className="ap-count-badge">{categoryVideos.length} videos</span>
        <button className="ap-btn ap-btn-primary" onClick={() => {
          if (showForm) {
            handleCancel();
          } else {
            setForm({ title: '', category: selectedCategory, url: '', thumbnail: '', description: '', tags: '' });
            setShowForm(true);
            setEditingVideoId(null);
          }
        }}>
          <Plus size={16} /> {showForm ? 'Cancel' : 'Add New Video'}
        </button>
      </div>

      {showForm && (
        <div className="ap-form-card">
          <h3 className="ap-form-title">{editingVideoId ? 'Edit Video' : `New Video in ${currentCategoryLabel}`}</h3>
          <form onSubmit={handleAdd} className="ap-review-form">
            <div className="ap-form-group">
              <label className="ap-label">Video Title *</label>
              <input className="ap-input" placeholder="e.g. SaaS Explainer 2024" value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
            </div>
            
            <div className="ap-form-group">
              <label className="ap-label">Video URL * (YouTube, Vimeo ya Google Drive)</label>
              <input className="ap-input" placeholder="https://drive.google.com/file/d/.../view" value={form.url}
                onChange={e => setForm(p => ({ ...p, url: e.target.value }))} required />
              <p style={{ fontSize: '0.78rem', color: '#888', marginTop: '0.4rem', lineHeight: 1.5 }}>
                📌 <strong>Google Drive:</strong> File share link paste karo (anyone with link can view set karo) &nbsp;|&nbsp;
                🎥 <strong>YouTube:</strong> watch link bhi kaam karta hai
              </p>
            </div>
            <div className="ap-form-row">
              <div className="ap-form-group">
                <label className="ap-label">Tags (comma separated)</label>
                <input className="ap-input" placeholder="e.g. real estate, hotel, intro" value={form.tags}
                  onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} />
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Thumbnail URL (optional)</label>
                <input className="ap-input" placeholder="https://..." value={form.thumbnail}
                  onChange={e => setForm(p => ({ ...p, thumbnail: e.target.value }))} />
              </div>
            </div>
            <div className="ap-form-group">
              <label className="ap-label">Description</label>
              <textarea className="ap-textarea" rows={2} placeholder="Short description..."
                value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>

            {/* Embed preview */}
            {form.url && getEmbedUrl(form.url) && (
              <div className="ap-video-preview">
                <label className="ap-label">Preview:</label>
                <iframe
                  src={getEmbedUrl(form.url)}
                  className="ap-video-iframe"
                  title="Video preview"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}

            <div className="ap-action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="ap-btn ap-btn-primary">
                {editingVideoId ? <Save size={16} /> : <Plus size={16} />} 
                {editingVideoId ? 'Save Changes' : 'Add Video'}
              </button>
              <button type="button" className="ap-btn ap-btn-ghost" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="ap-video-grid">
        {categoryVideos.length === 0 && (
          <div className="ap-empty">No videos yet. Add your first video above!</div>
        )}
        {categoryVideos.map(vid => (
          <div key={vid.id} className="ap-video-card">
            <div className="ap-video-thumb">
              {vid.thumbnail ? (
                <img src={vid.thumbnail} alt={vid.title} className="ap-video-thumb-img" />
              ) : vid.url && getEmbedUrl(vid.url) ? (
                <iframe src={getEmbedUrl(vid.url)} className="ap-video-thumb-iframe" title={vid.title} allowFullScreen />
              ) : (
                <div className="ap-video-placeholder">
                  <Video size={32} color="#aaa" />
                  <span>No preview</span>
                </div>
              )}
            </div>
            <div className="ap-video-info">
              <h4 className="ap-video-title">{vid.title}</h4>
              <span className="ap-video-cat">{vid.category.replace(/-/g, ' ')}</span>
              {vid.tags && <div style={{marginTop: 5, fontSize: '0.8rem', color: '#888'}}>Tags: {vid.tags}</div>}
              {vid.description && <p className="ap-video-desc" style={{marginTop: 5}}>{vid.description}</p>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="ap-icon-btn" style={{ background: 'var(--col-blue)', color: 'white' }} onClick={() => {
                setForm(vid);
                setEditingVideoId(vid.id);
                setShowForm(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} title="Edit video">
                <Edit3 size={16} />
              </button>
              <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => {
                deleteVideo(vid.id);
                toast('Video removed.');
              }} title="Delete video">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// TAB: STATS & HERO
// ══════════════════════════════════════════════════════════════════════════════
const ContentTab = ({ toast }) => {
  const { stats, updateStats, hero, updateHero, contactInfo, updateContactInfo } = useAdmin();
  const [localStats, setLocalStats] = useState({ ...stats });
  const [localHero, setLocalHero] = useState({ ...hero });
  const [localContact, setLocalContact] = useState({ ...contactInfo });

  const handleSaveStats = () => {
    updateStats(localStats);
    toast('Stats updated!');
  };

  const handleSaveHero = () => {
    updateHero(localHero);
    toast('Hero text updated! Reload home page to see changes.');
  };

  const handleSaveContact = () => {
    updateContactInfo(localContact);
    toast('Contact info updated! Changes apply live to Contact page and WhatsApp buttons.');
  };

  return (
    <div className="ap-tab-content">
      <SectionHeader icon={Edit3} title="Content Editor" subtitle="Edit homepage stats, hero headline, and key text." />

      {/* Stats */}
      <div className="ap-form-card">
        <h3 className="ap-form-title">Homepage Stats</h3>
        <div className="ap-form-row">
          {[
            { key: 'projects', label: 'Projects Shipped' },
            { key: 'views', label: 'Views Generated' },
            { key: 'brands', label: 'Happy Brands' },
            { key: 'inhouse', label: 'In-house %' },
          ].map(({ key, label }) => (
            <div key={key} className="ap-form-group">
              <label className="ap-label">{label}</label>
              <input className="ap-input" value={localStats[key]}
                onChange={e => setLocalStats(p => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
        </div>
        <div className="ap-action-row">
          <button className="ap-btn ap-btn-primary" onClick={handleSaveStats}><Save size={16} /> Save Stats</button>
        </div>
      </div>

      {/* Hero */}
      <div className="ap-form-card" style={{ marginTop: '2rem' }}>
        <h3 className="ap-form-title">Hero Section Text</h3>
        <div className="ap-form-group">
          <label className="ap-label">Agency Tag</label>
          <input className="ap-input" value={localHero.tagline}
            onChange={e => setLocalHero(p => ({ ...p, tagline: e.target.value }))} />
        </div>
        <div className="ap-form-row">
          <div className="ap-form-group">
            <label className="ap-label">Headline Word 1</label>
            <input className="ap-input" value={localHero.headline1}
              onChange={e => setLocalHero(p => ({ ...p, headline1: e.target.value }))} />
          </div>
          <div className="ap-form-group">
            <label className="ap-label">Highlighted Word 1</label>
            <input className="ap-input" value={localHero.highlight1}
              onChange={e => setLocalHero(p => ({ ...p, highlight1: e.target.value }))} />
          </div>
        </div>
        <div className="ap-form-row">
          <div className="ap-form-group">
            <label className="ap-label">Headline Word 2</label>
            <input className="ap-input" value={localHero.headline2}
              onChange={e => setLocalHero(p => ({ ...p, headline2: e.target.value }))} />
          </div>
          <div className="ap-form-group">
            <label className="ap-label">Highlighted Word 2</label>
            <input className="ap-input" value={localHero.highlight2}
              onChange={e => setLocalHero(p => ({ ...p, highlight2: e.target.value }))} />
          </div>
        </div>
        <div className="ap-form-group">
          <label className="ap-label">Hero Subtext</label>
          <textarea className="ap-textarea" rows={3} value={localHero.subtext}
            onChange={e => setLocalHero(p => ({ ...p, subtext: e.target.value }))} />
        </div>
        <div className="ap-action-row">
          <button className="ap-btn ap-btn-primary" onClick={handleSaveHero}><Save size={16} /> Save Hero Text</button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="ap-form-card" style={{ marginTop: '2rem' }}>
        <h3 className="ap-form-title">Contact Information</h3>
        <div className="ap-form-row">
          <div className="ap-form-group">
            <label className="ap-label">WhatsApp Number (with Country Code, no +)</label>
            <input className="ap-input" placeholder="e.g. 919876543210" value={localContact.whatsapp}
              onChange={e => setLocalContact(p => ({ ...p, whatsapp: e.target.value }))} />
          </div>
          <div className="ap-form-group">
            <label className="ap-label">Email Address</label>
            <input className="ap-input" placeholder="hello@company.com" value={localContact.email}
              onChange={e => setLocalContact(p => ({ ...p, email: e.target.value }))} />
          </div>
        </div>
        <div className="ap-action-row">
          <button className="ap-btn ap-btn-primary" onClick={handleSaveContact}><Save size={16} /> Save Contact Info</button>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// TAB: PRICING
// ══════════════════════════════════════════════════════════════════════════════
const PricingTab = ({ toast }) => {
  const { pricing, updatePricing } = useAdmin();
  const [localPricing, setLocalPricing] = useState([...pricing]);

  const handleSave = () => {
    updatePricing(localPricing);
    toast('Pricing plans updated!');
  };

  const updatePlan = (id, field, value) => {
    setLocalPricing(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="ap-tab-content">
      <SectionHeader icon={DollarSign} title="Pricing Editor" subtitle="Edit the 3 pricing plans shown on the Pricing page." />
      
      <div className="ap-pricing-grid" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {localPricing.map((plan) => (
          <div key={plan.id} className="ap-form-card">
            <h3 className="ap-form-title">Plan: {plan.title}</h3>
            
            <div className="ap-form-row">
              <div className="ap-form-group">
                <label className="ap-label">Title</label>
                <input className="ap-input" value={plan.title} onChange={e => updatePlan(plan.id, 'title', e.target.value)} />
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Price</label>
                <input className="ap-input" value={plan.price} onChange={e => updatePlan(plan.id, 'price', e.target.value)} />
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Period (e.g. /mo)</label>
                <input className="ap-input" value={plan.period} onChange={e => updatePlan(plan.id, 'period', e.target.value)} />
              </div>
            </div>

            <div className="ap-form-group">
              <label className="ap-label">Subtitle</label>
              <input className="ap-input" value={plan.subtitle} onChange={e => updatePlan(plan.id, 'subtitle', e.target.value)} />
            </div>

            <div className="ap-form-group">
              <label className="ap-label">Features (one per line)</label>
              <textarea className="ap-textarea" rows={5} value={plan.features} onChange={e => updatePlan(plan.id, 'features', e.target.value)} />
            </div>

            <div className="ap-form-row">
              <div className="ap-form-group">
                <label className="ap-label">Background Color</label>
                <input className="ap-input" value={plan.bgColor} onChange={e => updatePlan(plan.id, 'bgColor', e.target.value)} />
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Text Color</label>
                <input className="ap-input" value={plan.textColor} onChange={e => updatePlan(plan.id, 'textColor', e.target.value)} />
              </div>
              <div className="ap-form-group" style={{ justifyContent: 'flex-end' }}>
                <label className="ap-label">Most Popular Ribbon</label>
                <label className="ap-toggle">
                  <input type="checkbox" checked={plan.isPopular} onChange={e => updatePlan(plan.id, 'isPopular', e.target.checked)} />
                  <span className="ap-toggle-slider" />
                </label>
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="ap-action-row" style={{ marginTop: '2rem' }}>
        <button className="ap-btn ap-btn-primary" onClick={handleSave}><Save size={16} /> Save Pricing</button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'content', label: 'Content', icon: Edit3 },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
];

const AdminDashboard = () => {
  const { logout, isLoggedIn, reviews, videos } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('colors');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    if (!isLoggedIn) navigate('/admin');
  }, [isLoggedIn, navigate]);

  const toast = (msg) => setToastMsg(msg);

  return (
    <div className="admin-dashboard">
      {/* Toast */}
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg('')} />}

      {/* Sidebar */}
      <aside className="ap-sidebar">
        <div className="ap-sidebar-logo">
          <div className="ap-logo-badge">K</div>
          <div>
            <div className="ap-logo-name">Klyrex</div>
            <div className="ap-logo-admin">Admin Panel</div>
          </div>
        </div>

        <nav className="ap-nav">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`ap-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
                {tab.id === 'reviews' && <span className="ap-nav-badge">{reviews.length}</span>}
                {tab.id === 'videos' && <span className="ap-nav-badge">{videos.length}</span>}
              </button>
            );
          })}
        </nav>

        <div className="ap-sidebar-bottom">
          <a href="/" target="_blank" rel="noopener noreferrer" className="ap-nav-item ap-view-site">
            <Globe size={18} />
            <span>View Website</span>
          </a>
          <button className="ap-nav-item ap-logout" onClick={() => { logout(); navigate('/admin'); }}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ap-main">
        {/* Top bar */}
        <header className="ap-topbar">
          <div className="ap-breadcrumb">
            <Home size={16} />
            <ChevronRight size={14} />
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="ap-breadcrumb-active">{TABS.find(t => t.id === activeTab)?.label}</span>
          </div>
          <div className="ap-topbar-right">
            <div className="ap-status-dot" />
            <span className="ap-status-text">Live</span>
          </div>
        </header>

        {/* Tab content */}
        <div className="ap-content-area">
          {activeTab === 'colors' && <ColorsTab toast={toast} />}
          {activeTab === 'reviews' && <ReviewsTab toast={toast} />}
          {activeTab === 'videos' && <VideosTab toast={toast} />}
          {activeTab === 'content' && <ContentTab toast={toast} />}
          {activeTab === 'pricing' && <PricingTab toast={toast} />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
