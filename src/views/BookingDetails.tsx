import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOfferById } from '../services/offerService';
import { getUserBookings } from '../services/offerService';

interface Booking {
  _id: string;
  user: string;
  offer: string;
  date: string;
  status: string;
}

interface Offer {
  _id: string;
  type: string;
  description: string;
  price: number;
  pictures: string[];
  disponibility: boolean;
  localisation: string;
}

export default function BookingDetails() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (bookingId) {
          // Récupérer les détails de la réservation
          const userBookings = await getUserBookings('userId'); // Remplacer 'userId' par l'identifiant de l'utilisateur connecté
          const bookingDetails = userBookings.find((b) => b._id === bookingId);
          setBooking(bookingDetails || null);

          // Récupérer les détails de l'offre associée
          if (bookingDetails?.offer) {
            const offerDetails = await getOfferById(bookingDetails.offer);
            setOffer(offerDetails);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la réservation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!booking || !offer) {
    return <div className="text-center text-red-500">Aucune réservation ou offre trouvée.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Détails de la réservation
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Découvrez les détails de votre réservation pour l'offre {offer.type}
        </p>
      </div>

      <div className="mt-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Réservation pour {offer.type}</h3>
            <p className="mt-2 text-sm text-gray-500">{offer.description}</p>
            <p className="mt-2 text-lg font-semibold text-indigo-600">
              {offer.price.toLocaleString()}€
            </p>
            <div className="mt-4 flex items-center">
              <span className="ml-1 text-sm text-gray-500">{offer.localisation}</span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Statut de la réservation: {booking.status}</p>
              <p className="text-sm text-gray-500">Date de réservation: {booking.date}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/bookings/${offer._id}`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Voir l'offre
              </Link>
              <Link
                to="/bookings"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Retour aux réservations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}