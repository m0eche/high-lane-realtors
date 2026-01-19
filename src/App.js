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
    // Adding { cache: 'no-store' } or a timestamp ensures freshness
    client.fetch('*[_type == "property"]', {}, { cache: 'no-store' })
      .then((data) => setListings(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      {/* 1. NAVIGATION */}
      <nav className="nav">
        <div className="logo">HIGH-LANE</div>
        <div className="nav-links">
          <a href="#listings">Listings</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="hero">
        <h1>High-Lane Homes & Allied</h1>
        <p>CREATING THE EXTRAORDINARY</p>
        <a href="#listings" className="cta-button">View Properties</a>
      </header>

      {/* 3. ABOUT SECTION (New) */}
      <section id="about" className="info-section">
        <div className="info-content">
          <h2>About High-Lane Homes</h2>
          <p>
            With years of expertise in the Kenyan real estate market, 
            High-Lane Homes & Allied specializes in connecting discerning clients with 
            extraordinary properties. We believe that a home is more than just a 
            building—it's a legacy.
          </p>
        </div>
      </section>

      {/* 4. LISTINGS SECTION */}
      <section id="listings" className="listings-section">
        <h2 className="section-title">CURATED LISTINGS</h2>
        <div className="listings-grid">
          {listings.map((house, index) => (
            <div key={index} className="property-card">
              {house.image && (
                <img className="property-image" src={urlFor(house.image).url()} alt={house.title} />
              )}
              <div className="property-info">
                <h3>{house.title}</h3>
                <p className="location-pin">📍 {house.location}</p>
                <p className="price">KES {house.price?.toLocaleString()}</p>
                {/* Replace 254700000000 with your mom's actual WhatsApp number */}
                <a href={`https://wa.me/254700000000?text=I am interested in ${house.title}`} className="inquire-btn" target="_blank" rel="noreferrer">
                  Inquire via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CONTACT & FOOTER (New) */}
      <footer id="contact" className="contact-footer">
        <h2>Get In Touch</h2>
        <p>Ready to find your dream home? Contact our lead consultant today.</p>
        <div className="contact-details">
          <p>📞 +254 7XX XXX XXX</p>
          <p>📧 info@highlanehomes.com</p>
          <p>📍 Mombasa, Kenya</p>
        </div>
        <p className="copyright">© 2026 High-Lane Homes & Allied. All Rights Reserved.</p>
      </footer>
    </div>
  );
} // <--- Add this bracket!

export default App;