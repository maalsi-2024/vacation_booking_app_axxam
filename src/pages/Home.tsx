import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { getAllOffers } from '../services/offerService';

interface Offer {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  localisation: string;
  disponibilite: boolean;
}

export default function Home() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Trouvez votre prochain logement
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Découvrez des offres immobilières uniques avec Axxam
        </p>
        
        <div className="mt-10">
          <Link
            to="/offers"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Search className="mr-2 h-5 w-5" />
            Explorer les offres
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Offres disponibles</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.filter(offer => offer.disponibilite).map((offer) => (
              <div key={offer._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{offer.titre}</h3>
                  <p className="mt-2 text-sm text-gray-500">{offer.description}</p>
                  <p className="mt-2 text-lg font-semibold text-indigo-600">{offer.prix.toLocaleString()}€</p>
                  <div className="mt-4 flex items-center">
                    <MapPin className="h-4 w-4 text-indigo-600" />
                    <span className="ml-1 text-sm text-gray-500">{offer.localisation}</span>
                  </div>
                  <Link
                    to={`/offers/${offer._id}`}
                    className="mt-4 block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}