export interface Destination {
  _id?: string;
  name: string;
  description: string;
  image_url: string;
  price_per_night: number;
  created_at: Date;
}

export interface Booking {
  _id?: string;
  user_id: string;
  destination_id: string;
  check_in: Date;
  check_out: Date;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: Date;
}