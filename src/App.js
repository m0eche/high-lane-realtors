import React, { useEffect, useState } from 'react';
import { client } from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import './App.css';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "property"]')
      .then((data) => setListings(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <nav className="nav">
        <div className="logo">HIGH-LANE</div>
        <div>Contact: +254...</div>
      </nav>

      <header className="hero">
        <h1>High-Lane Homes & Allied</h1>
        <p>CREATING THE EXTRAORDINARY</p>
      </header>

      <section className="listings-section">
        <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#d4af37' }}>CURATED LISTINGS</h2>
        <div className="listings-grid">
          {listings.map((house, index) => (
            <div key={index} className="property-card">
              {house.mainImage && (
                <img 
                  className="property-image"
                  src={urlFor(house.mainImage).url()} 
                  alt={house.title} 
                />
              )}
              <div className="property-info">
                <h3>{house.title}</h3>
                <p>{house.location}</p>
                <p className="price">KES {house.price?.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;