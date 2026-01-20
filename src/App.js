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
        
        <a href="#listings" className="cta-button">View Properties</a>
      </header>

      {/* 3. ABOUT SECTION (New) */}
      <section id="about" className="info-section">
        <div className="info-content">
          <h2>About High-Lane Homes</h2>
          <p>
           High-Lane Homes is a licensed, EARB-registered property agency delivering end-to-end real estate solutions. Our services span property sales, lettings, and professional property management for both residential and commercial properties. We pride ourselves on market expertise, ethical practice, and personalized service, ensuring our clients enjoy peace of mind while achieving optimal returns on their property investments.
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
          <p>📞 +254 721886637 | +254 733400015</p>
          <p>📧 highlanerealtors@gmail.com</p>
          <p>📍 Mombasa, Kenya</p>
        </div>
        <p className="copyright">© 2026 High-Lane Homes & Allied. All Rights Reserved.</p>
      </footer>
    </div>
  );
} // <--- Add this bracket!

export default App;