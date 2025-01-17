export interface Offer {
  id: string;
  type: 'accommodation' | 'activity' | 'transport';
  title: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  images: string[];
  availability: {
    startDate: string;
    endDate: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
}

export interface Reservation {
  id: string;
  userId: string;
  offerId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}