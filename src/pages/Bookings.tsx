import React, { useState, useEffect } from "react";
import { Calendar, Clock, Users, MapPin, CheckCircle, XCircle, Clock3 } from "lucide-react";
import type { Booking } from "../types";
import { getUserBookings, updateBookingStatus } from "../services/bookingService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Note: Dans un vrai projet, l'ID de l'utilisateur viendrait du contexte d'authentification
        const mockUserId = "user123";
        const data = await getUserBookings(mockUserId);
        setBookings(data);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock3 className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmée";
      case "cancelled":
        return "Annulée";
      default:
        return "En attente";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mes Réservations</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-2">{getStatusText(booking.status)}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p>{format(new Date(booking.check_in), "dd MMMM yyyy", { locale: fr })}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p>{format(new Date(booking.check_out), "dd MMMM yyyy", { locale: fr })}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Voyageurs</p>
                      <p>
                        {booking.guests} personne{booking.guests > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Destination ID</p>
                      <p className="truncate">{booking.destination_id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                <p className="text-2xl font-bold text-indigo-600">{booking.total_price}€</p>
                {booking.status === "pending" && (
                  <div className="mt-4 space-x-2">
                    <button onClick={() => updateBookingStatus(booking._id!, "cancelled")} className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700">
                      Annuler
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune réservation</h3>
            <p className="mt-1 text-sm text-gray-500">Vous n'avez pas encore de réservation.</p>
          </div>
        )}
      </div>
    </div>
  );
}