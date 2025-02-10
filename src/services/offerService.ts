import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface Offer {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  localisation: string;
  disponibilite: boolean;
}

interface Reservation {
  _id: string;
  utilisateur_id: string;
  offre_id: string;
  date_reservation: string;
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

export async function createReservation(reservation: Omit<Reservation, '_id' | 'status'>): Promise<Reservation> {
  try {
    const response = await axios.post(`${API_URL}/reservations`, reservation);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    throw error;
  }
}

export async function getUserReservations(userId: string): Promise<Reservation[]> {
  try {
    const response = await axios.get(`${API_URL}/reservations/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    throw error;
  }
}

export async function updateReservationStatus(reservationId: string, status: string): Promise<void> {
  try {
    await axios.patch(`${API_URL}/reservations/${reservationId}/status`, { status });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
    throw error;
  }
}