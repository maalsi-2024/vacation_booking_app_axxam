import { useState, useEffect } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { getAllOffers } from '../services/offerService';

interface Offer {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  localisation: string;
  disponibilite: boolean;
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getAllOffers();
        setOffers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des offres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter(offer =>
    offer.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.localisation.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
            <input
              type="text"
              placeholder="Rechercher une offre..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de visite</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{offer.titre}</h3>
                <span className="text-lg font-bold text-indigo-600">
                  {offer.prix.toLocaleString()}€
                </span>
              </div>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{offer.localisation}</span>
              </div>
              <div className="flex items-center text-gray-500 mb-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  offer.disponibilite 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {offer.disponibilite ? 'Disponible' : 'Non disponible'}
                </span>
              </div>
              <button
                className={`w-full py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-300 ${
                  offer.disponibilite
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={() => {/* TODO: Implement booking logic */}}
                disabled={!offer.disponibilite}
              >
                {offer.disponibilite ? 'Réserver une visite' : 'Non disponible'}
                {offer.disponibilite && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}