import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>{title}</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Welcome to the {title} page. This is a structural placeholder that you can fill with the actual content.
      </p>
    </div>
  );
};

export default PlaceholderPage;
