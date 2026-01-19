import React, { useEffect, useState } from 'react';
import { client } from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';

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
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>High-Lane Homes Listings</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {listings.map((house, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '250px' }}>
            {house.mainImage && <img src={urlFor(house.mainImage).url()} alt={house.title} style={{ width: '100%', borderRadius: '8px' }} />}
            <h2>{house.title}</h2>
            <p>{house.location}</p>
            <p><strong>${house.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;