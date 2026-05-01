import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Search } from 'lucide-react';
import { useAdmin } from '../admin/AdminContext';
import './PortfolioCategory.css';

const categoriesInfo = {
  'motion-graphics': { title: 'Motion Graphics.', tag: 'ANIMATION & MOTION DESIGN', color: 'var(--col-yellow)' },
  'short-form-reels': { title: 'Short-form Reels.', tag: 'TIKTOK, REELS & SHORTS', color: 'var(--col-orange)' },
  'long-form-video': { title: 'Long-form Video.', tag: 'YOUTUBE & VSLS', color: 'var(--col-green)' },
  'saas-explainers': { title: 'SaaS Explainers.', tag: 'PRODUCT DEMOS', color: 'var(--col-blue)' },
  'graphic-design': { 
    title: 'Graphic Design.', 
    tag: 'POSTERS, SOCIAL KITS & EDITORIAL', 
    desc: 'Punchy illustrative layouts for socials, print and product. Designed to live as loud on a billboard as on a story.',
    color: 'var(--col-green)',
  },
  'company-branding': { title: 'Company Branding.', tag: 'BRAND IDENTITY DESIGNS', color: 'var(--col-blue)' }
};

const getEmbedUrl = (url) => {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vmMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`;
  // Google Drive — convert share/view link to preview embed
  const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  return url;
};

// Returns true if the embed URL is a Google Drive preview
const isDriveEmbed = (embedUrl) => embedUrl && embedUrl.includes('drive.google.com');

const PortfolioCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { videos } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  
  const catData = categoriesInfo[category];

  if (!catData) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2>Category not found</h2>
        <button className="btn-back" onClick={() => navigate('/')} style={{ margin: '2rem auto' }}>
          Back to Home
        </button>
      </div>
    );
  }

  // Get videos for this category
  const categoryVideos = videos.filter(vid => vid.category === category);
  
  // Search / Tag Sorting logic
  // If search is active, videos matching the tag/title bubble to the top.
  const query = searchTerm.toLowerCase().trim();
  const displayVideos = [...categoryVideos].sort((a, b) => {
    if (!query) return 0;
    
    const aTags = (a.tags || '').toLowerCase();
    const aTitle = (a.title || '').toLowerCase();
    const bTags = (b.tags || '').toLowerCase();
    const bTitle = (b.title || '').toLowerCase();
    
    const aMatch = aTags.includes(query) || aTitle.includes(query);
    const bMatch = bTags.includes(query) || bTitle.includes(query);
    
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0; // retain original order among matches/non-matches
  });

  const ctaTitle = catData.title.toLowerCase().replace('.', '');

  // Define aspect ratio based on category (Shorts are 9:16, others 16:9)
  const isShortForm = category === 'short-form-reels';

  return (
    <div className="portfolio-category-page">
      
      <div className="category-hero-grid">
        <div className="hero-content">
          <div className="hero-nav">
            <button className="btn-back" onClick={() => navigate('/work')}>
              <ArrowLeft size={18} /> All categories
            </button>
            <div className="hero-tag">
              <span style={{ color: 'var(--col-orange)' }}>●</span> {catData.tag}
            </div>
          </div>
          
          <h1 className="category-title">{catData.title}</h1>
          <p className="category-desc">
            {catData.desc || `Each frame is crafted with obsession. Dive into our hand-picked selection of elite-tier ${catData.title.toLowerCase().replace('.', '')} projects.`}
          </p>
        </div>
      </div>
      
      <div className="projects-container">
        {/* Search Bar */}
        <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            position: 'relative', width: '100%', maxWidth: '600px'
          }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--col-dark)', opacity: 0.5 }} />
            <input 
              type="text" 
              placeholder={`Search by tags (e.g. real estate, hotel...)`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="card-2d"
              style={{
                width: '100%', padding: '1.2rem 1.2rem 1.2rem 3rem',
                fontSize: '1.1rem', borderRadius: '12px',
                border: '3px solid var(--col-dark)',
                outline: 'none', background: 'white'
              }}
            />
          </div>
        </div>

        <div className="projects-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: isShortForm ? 'repeat(auto-fill, minmax(280px, 1fr))' : 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {displayVideos.map(vid => {
            const isMatch = query && ((vid.tags || '').toLowerCase().includes(query) || (vid.title || '').toLowerCase().includes(query));
            const embedUrl = getEmbedUrl(vid.url);
            
            return (
              <div 
                key={vid.id} 
                style={{ 
                  width: '100%', 
                  background: 'var(--col-dark)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: isMatch ? '4px solid var(--col-yellow)' : '4px solid var(--col-dark)',
                  boxShadow: isMatch ? '6px 6px 0 var(--col-yellow)' : '6px 6px 0 var(--col-dark)',
                  transition: 'all 0.3s ease',
                  opacity: (query && !isMatch) ? 0.4 : 1, // Dim non-matching items
                }}
              >
                {embedUrl ? (
                  // Download-protection wrapper: transparent overlay blocks right-click & drag
                  <div style={{ position: 'relative', width: '100%', aspectRatio: isShortForm ? '9/16' : '16/9' }}>
                    <iframe 
                      src={embedUrl} 
                      title={vid.title}
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        border: 'none',
                        display: 'block',
                        position: 'absolute',
                        top: 0, left: 0
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      // Prevent download via attribute for Google Drive
                      {...(isDriveEmbed(embedUrl) ? { sandbox: 'allow-scripts allow-same-origin allow-presentation allow-popups' } : {})}
                    />
                    {/* Transparent overlay — blocks right-click save/download */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        zIndex: 10,
                        // Pointer-events none so clicks still reach iframe for play/pause;
                        // but we capture contextmenu to block right-click save
                        background: 'transparent',
                        pointerEvents: 'none',
                      }}
                      onContextMenu={e => e.preventDefault()}
                    />
                  </div>
                ) : (
                  <div style={{ width: '100%', aspectRatio: isShortForm ? '9/16' : '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <p>Invalid Video URL</p>
                  </div>
                )}
              </div>
            );
          })}

          {displayVideos.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
              <h3>No videos uploaded yet.</h3>
              <p>Add some videos in the Admin Panel.</p>
            </div>
          )}
        </div>
      </div>

      <div className="category-cta-section">
        <div className="cta-box card-2d">
          <h2>Want a {ctaTitle} reel</h2>
          <div className="cta-cursive">made just for you?</div>
          <button className="cta-btn" onClick={() => window.open('https://wa.me/919756289688', '_blank')}>
            Start a project <ArrowUpRight size={20} strokeWidth={2.5}/>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default PortfolioCategory;
