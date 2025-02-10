import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface Offer {
  _id: string;
  type: string; // "Villa" ou autre
  description: string;
  price: number;
  pictures: string[]; // Tableau d'URLs d'images
  disponibility: boolean;
  localisation: string;
}

interface Booking {
  _id: string;
  user: string;  // user_id dans ton back-end
  offer: string;  // offer_id dans ton back-end
  date: string;  // date_reservation dans ton back-end
  status: string;
}

export async function getAllOffers(): Promise<Offer[]> {
  try {
    const response = await axios.get(`${API_URL}/offers`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des offres:', error);
    throw error;
  }
}

export async function getOfferById(id: string): Promise<Offer> {
  try {
    const response = await axios.get(`${API_URL}/offers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'offre ${id}:`, error);
    throw error;
  }
}

export async function createBooking(booking: Omit<Booking, '_id' | 'status'>): Promise<Booking> {
  try {
    const response = await axios.post(`${API_URL}/bookings`, booking);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    throw error;
  }
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const response = await axios.get(`${API_URL}/bookings/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    throw error;
  }
}

export async function updateBookingStatus(bookingId: string, status: string): Promise<void> {
  try {
    await axios.patch(`${API_URL}/bookings/${bookingId}/status`, { status });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
    throw error;
  }
}