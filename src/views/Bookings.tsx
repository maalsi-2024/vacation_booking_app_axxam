import { useState, useEffect } from "react";
import { getUserBookings, getOfferById, updateBookingStatus } from "../services/offerService";
import { Calendar, MapPin, AlertCircle } from "lucide-react";

interface Reservation {
  _id: string;
  user: string;  // user_id in the backend
  offer: string;  // offer_id in the backend
  date: string;  // date_reservation in the backend
  status: string;
}

interface Offer {
  _id: string;
  type: string; // e.g., "Villa" or other types
  description: string;
  price: number;
  pictures: string[]; // Array of image URLs
  disponibility: boolean;
  localisation: string;
}

interface ReservationWithOffer extends Omit<Reservation, 'offer'> {
  offer?: Offer;  // make offer optional since it may not always be available
}

export default function Bookings() {
  const [reservations, setReservations] = useState<ReservationWithOffer[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with actual logged-in user ID
  const userId = "789102";
  
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsData = await getUserBookings(userId);

        // Fetch offer details for each reservation
        const reservationsWithOffers = await Promise.all(
          reservationsData.map(async (reservation) => {
            try {
              const offer = await getOfferById(reservation.offer);  // Fetch offer by offer ID
              return { ...reservation, offer };
            } catch (error) {
              console.error(`Error fetching offer ${reservation.offer}:`, error);
              return { ...reservation, offer: undefined };  // Ensure offer is undefined if there's an error
            }
          })
        );

        setReservations(reservationsWithOffers);
      } catch (error) {
        console.error("Error loading reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmée":
        return "bg-green-100 text-green-800";
      case "en attente":
        return "bg-yellow-100 text-yellow-800";
      case "annulée":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await updateBookingStatus(reservationId, "Annulée");
      setReservations((prevReservations) => prevReservations.map((reservation) =>
        reservation._id === reservationId ? { ...reservation, status: "Annulée" } : reservation
      ));
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune réservation</h3>
          <p className="mt-1 text-sm text-gray-500">Vous n'avez pas encore effectué de réservation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes Réservations</h1>
      <div className="grid gap-6">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{reservation.offer?.type || "Offre non disponible"}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(reservation.status)}`}>{reservation.status}</span>
                </div>
                {reservation.offer && (
                  <>
                    <p className="text-gray-600 mb-4">{reservation.offer.description}</p>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{reservation.offer.localisation}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(reservation.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-indigo-600">{reservation.offer.price.toLocaleString()}€</div>
                  </>
                )}
              </div>
              {reservation.status.toLowerCase() !== "annulée" && (
                <div className="mt-4 md:mt-0 md:ml-6 flex items-start">
                  <button onClick={() => handleCancelReservation(reservation._id)} className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors duration-300">
                    Annuler la réservation
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}