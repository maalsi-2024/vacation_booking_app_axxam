import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOfferById } from "../services/offerService"; 

interface Offer {
  _id: string;
  type: string;
  description: string;
  price: number;
  pictures: string[];
  disponibility: boolean;
  localisation: string;
}

export default function DestinationDetails() {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      if (destinationId) {
        try {
          const data = await getOfferById(destinationId);
          setOffer(data);
        } catch (error) {
          console.error("Erreur lors du chargement de l'offre:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOfferDetails();
  }, [destinationId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!offer) {
    return <div>Offre non trouvée.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">{offer.type} - {offer.description}</h2>
          <div className="mb-6">
            <div className="text-lg font-bold text-indigo-600">{offer.price.toLocaleString()}€</div>
            <p className="text-gray-600">{offer.description}</p>
            <p className="text-gray-500 mt-2"><strong>Localisation:</strong> {offer.localisation}</p>
            <p className={`mt-2 px-2 py-1 rounded-full text-sm ${offer.disponibility ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {offer.disponibility ? "Disponible" : "Non disponible"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offer.pictures.map((pic, index) => (
              <img key={index} src={pic} alt={`Image ${index + 1}`} className="w-full h-60 object-cover rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}