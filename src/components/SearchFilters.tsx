import React from 'react';
import { Calendar, MapPin, Plane, Home, Activity } from 'lucide-react';

export function SearchFilters() {
  return (
    <div className="bg-white/10 backdrop-blur-md border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all transform hover:scale-105">
            <MapPin className="h-5 w-5 mr-2 text-blue-400" />
            <span>Location</span>
          </button>
          <button className="flex items-center px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all transform hover:scale-105">
            <Calendar className="h-5 w-5 mr-2 text-purple-400" />
            <span>Dates</span>
          </button>
          <button className="flex items-center px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all transform hover:scale-105">
            <Home className="h-5 w-5 mr-2 text-pink-400" />
            <span>Accommodations</span>
          </button>
          <button className="flex items-center px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all transform hover:scale-105">
            <Activity className="h-5 w-5 mr-2 text-green-400" />
            <span>Activities</span>
          </button>
          <button className="flex items-center px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all transform hover:scale-105">
            <Plane className="h-5 w-5 mr-2 text-yellow-400" />
            <span>Transport</span>
          </button>
        </div>
      </div>
    </div>
  );
}