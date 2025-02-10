import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import type { Destination } from '../types';
import { getAllDestinations } from '../services/destinationService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDates, setSelectedDates] = useState({
    checkIn: '',
    checkOut: ''
  });
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getAllDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Erreur lors du chargement des destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
            <input
              type="text"
              placeholder="Rechercher une destination..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedDates.checkIn}
                onChange={(e) => setSelectedDates(prev => ({ ...prev, checkIn: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Voyageurs</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <div key={destination._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src={destination.image_url}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                <span className="text-lg font-bold text-indigo-600">
                  {destination.price_per_night}€ <span className="text-sm text-gray-500">/nuit</span>
                </span>
              </div>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Voir sur la carte</span>
              </div>
              <button
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                onClick={() => {/* TODO: Implement booking logic */}}
              >
                Réserver maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}