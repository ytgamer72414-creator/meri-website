import React, { useState } from 'react';
import { useAdmin } from '../admin/AdminContext';

const Reviews = () => {
  const { reviews, addReview } = useAdmin();
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

  return (
    <div className="reviews-page" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
       <h1 style={{ fontSize: '4rem', marginBottom: '1rem', textAlign: 'center' }}>Don't just take our word for it.</h1>
       
       <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
       </div>

       {showForm && (
         <div style={{ maxWidth: '600px', margin: '0 auto 4rem', padding: '2rem', background: 'white', borderRadius: '16px', border: '2px solid var(--col-dark)', boxShadow: '4px 4px 0px var(--col-dark)' }}>
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
             <button type="submit" style={{ padding: '1rem', background: 'var(--col-orange)', color: 'white', border: '2px solid var(--col-dark)', borderRadius: '8px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}>
               Submit Review
             </button>
           </form>
         </div>
       )}
       
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
         {reviews.map((rev) => (
           <div 
             key={rev.id} 
             className="card-2d" 
             style={{ 
               backgroundColor: rev.color, 
               color: rev.textLight ? 'white' : 'var(--col-dark)',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between',
               minHeight: '300px'
             }}
           >
             <div>
               <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', color: rev.textLight ? 'white' : 'var(--col-dark)' }}>
                 {'★★★★★'.split('').slice(0, rev.stars).map((star, i) => <span key={i} style={{ fontSize: '1.2rem' }}>{star}</span>)}
               </div>
               <p style={{ fontSize: '1.2rem', lineHeight: 1.5, fontWeight: 500, marginBottom: '2rem' }}>
                 "{rev.text}"
               </p>
             </div>
             
             <div style={{ borderTop: `1px solid ${rev.textLight ? 'rgba(255,255,255,0.2)' : 'rgba(10,25,47,0.2)'}`, paddingTop: '1rem' }}>
               <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{rev.author}</h4>
               <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{rev.role}</p>
             </div>
           </div>
         ))}
       </div>

       {reviews.length === 0 && (
         <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
           <p style={{ fontSize: '1.2rem' }}>No reviews yet. Add some from the <a href="/admin" style={{ color: 'inherit', textDecoration: 'underline' }}>Admin Panel</a>.</p>
         </div>
       )}
    </div>
  );
};

export default Reviews;
