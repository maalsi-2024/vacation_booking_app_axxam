import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';
import { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/20">
      <div className="relative h-56">
        <img
          src={offer.images[0]}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-semibold">
          ${offer.price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{offer.title}</h3>
          <div className="flex items-center bg-yellow-400/20 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-yellow-400 font-medium">{offer.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-300 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 text-purple-400" />
          <span>{offer.location}</span>
        </div>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{offer.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="h-4 w-4 mr-1 text-blue-400" />
            <span>Available Now</span>
          </div>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}