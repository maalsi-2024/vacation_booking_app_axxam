import React from 'react';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { OfferCard } from './components/OfferCard';
import { Offer } from './types';

// Sample data - replace with actual API calls
const sampleOffers: Offer[] = [
  {
    id: '1',
    type: 'accommodation',
    title: 'Luxury Beach Resort',
    description: 'Experience paradise in this 5-star beachfront resort with stunning ocean views and world-class amenities.',
    price: 299,
    location: 'Maldives',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'],
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    }
  },
  {
    id: '2',
    type: 'activity',
    title: 'Desert Safari Adventure',
    description: 'Embark on an unforgettable desert safari with camel riding, sandboarding, and traditional dinner under the stars.',
    price: 149,
    location: 'Dubai',
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80'],
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    }
  },
  {
    id: '3',
    type: 'transport',
    title: 'First Class Flight',
    description: 'Travel in ultimate comfort with our first-class flight service, featuring fully-reclining seats and gourmet meals.',
    price: 899,
    location: 'Paris - New York',
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    }
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Video Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>

      <Header />
      <div className="relative">
        {/* Hero Section */}
        <div className="text-center py-20 px-4">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12">
            Explore breathtaking destinations, unforgettable experiences, and luxury accommodations worldwide.
          </p>
        </div>
        
        <SearchFilters />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Featured Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;