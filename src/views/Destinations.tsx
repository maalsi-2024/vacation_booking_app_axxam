'use client'

import { useState, useEffect } from "react";
import { MapPin, ArrowRight, Search, Calendar, Home } from 'lucide-react';
import { getAllOffers } from "../services/offerService";
import { useNavigate } from "react-router-dom";

interface Offer {
  _id: string;
  type: string;
  description: string;
  price: number;
  pictures: string[];
  disponibility: boolean;
  localisation: string;
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const router = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getAllOffers();
        setOffers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter(
    (offer) =>
      (offer.type.includes(selectedType) || selectedType === "") &&
      (offer.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
       offer.localisation.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient-x py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-8 animate-fade-in-down">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Trouvez votre prochaine destination</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Rechercher une offre..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de visite</label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type d'offre</label>
              <div className="relative">
                <select 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Tous les types</option>
                  <option value="Villa">Villa</option>
                  <option value="Appartement">Appartement</option>
                </select>
                <Home className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer, index) => (
            <div 
              key={offer._id} 
              className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-fade-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="relative pb-48 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
                  src={offer.pictures[0] || "/placeholder.svg?height=400&width=600"}
                  alt={offer.type}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {offer.type} - {offer.description}
                  </h3>
                  <span className="text-lg font-bold text-purple-600">{offer.price.toLocaleString()}€</span>
                </div>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-sm">{offer.localisation}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${offer.disponibility ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {offer.disponibility ? "Disponible" : "Non disponible"}
                  </span>
                </div>
                <button
                  className={`w-full py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300 ${
                    offer.disponibility 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (offer.disponibility) {
                      router(`/destinations/${offer._id}`);
                    }
                  }}
                  disabled={!offer.disponibility}
                >
                  {offer.disponibility ? "Réserver une visite" : "Non disponible"}
                  {offer.disponibility && <ArrowRight className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}