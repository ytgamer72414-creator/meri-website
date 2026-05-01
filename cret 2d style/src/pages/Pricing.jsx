import React from 'react';
import { useAdmin } from '../admin/AdminContext';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const { pricing, contactInfo } = useAdmin();
  const navigate = useNavigate();

  return (
    <div className="pricing-page" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="pricing-hero" style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'inline-block', border: '2px solid var(--col-dark)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '2rem', background: 'white' }}>
          <span style={{ color: 'var(--col-orange)' }}>●</span> PRICING
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.9, marginBottom: '0.5rem', color: 'var(--col-dark)', letterSpacing: '-0.03em' }}>
          Simple plans.
        </h1>
        <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, marginBottom: '2rem', color: 'var(--col-orange)', fontStyle: 'italic',   fontFamily: '"Outfit", sans-serif', fontWeight: 600 }}>
          Big impact.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', lineHeight: 1.6, fontWeight: 500 }}>
          Pick the creative velocity that fits your ambition. Every tier unlocks our elite-tier roster — no juniors, no compromises.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {pricing.map((plan) => (
          <div key={plan.id} style={{ position: 'relative' }}>
            {plan.isPopular && (
              <div style={{ position: 'absolute', top: '-15px', left: '2rem', background: '#FF7A59', color: 'white', padding: '0.3rem 1rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.1em', border: '2px solid var(--col-dark)', zIndex: 10, textTransform: 'uppercase' }}>
                Most Loved
              </div>
            )}
            <div className="card-2d" style={{ 
              backgroundColor: plan.bgColor, 
              color: plan.textColor,
              padding: '2.5rem 2rem', 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '540px', 
              transform: plan.isPopular ? 'translateY(-20px)' : 'none', 
              borderRadius: '24px' 
            }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{plan.title}</h2>
              <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '2rem', fontWeight: 500, whiteSpace: 'pre-line' }}>{plan.subtitle}</p>
              
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: plan.price === "Let's talk" ? '3rem' : '3.5rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>{plan.price}</span>
                {plan.period && <span style={{ fontSize: '1rem', opacity: 0.8, fontWeight: 600 }}>{plan.period}</span>}
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, marginBottom: '3rem' }}>
                {plan.features.split('\n').map((feature, i) => {
                  const isQuote = feature.trim().startsWith('→');
                  return (
                    <li key={i} style={{ 
                      display: 'flex', gap: '10px', alignItems: 'flex-start', 
                      fontSize: '0.95rem', fontWeight: isQuote ? 400 : 500,
                      fontStyle: isQuote ? 'italic' : 'normal',
                      opacity: isQuote ? 0.8 : 1,
                      marginTop: isQuote ? '1rem' : '0'
                    }}>
                      {!isQuote && <span style={{ fontWeight: 'bold' }}>✓</span>} 
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
              
              <button 
                className="btn" 
                onClick={() => window.open(`https://wa.me/${contactInfo?.whatsapp}?text=Hi, I'm interested in the ${plan.title} plan.`, '_blank')}
                style={{ width: '100%', justifyContent: 'center', background: '#FDFBF7', color: 'var(--col-dark)', border: '2px solid var(--col-dark)' }}
              >
                Get started ↗
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Pricing;
