import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Découvrez des destinations uniques
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Réservez votre prochain séjour dans les plus beaux endroits du monde avec Axxam
        </p>
        
        <div className="mt-10">
          <Link
            to="/destinations"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Search className="mr-2 h-5 w-5" />
            Explorer les destinations
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Destinations populaires</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Bali, Indonésie",
              image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
              price: "200€"
            },
            {
              title: "Santorini, Grèce",
              image: "https://images.unsplash.com/photo-1570077188670-6e65c2d60404",
              price: "180€"
            },
            {
              title: "Marrakech, Maroc",
              image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70",
              price: "150€"
            }
          ].map((destination, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={destination.image}
                alt={destination.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{destination.title}</h3>
                <p className="mt-1 text-sm text-gray-500">À partir de {destination.price} / nuit</p>
                <div className="mt-4 flex items-center">
                  <MapPin className="h-4 w-4 text-indigo-600" />
                  <span className="ml-1 text-sm text-gray-500">Voir sur la carte</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}