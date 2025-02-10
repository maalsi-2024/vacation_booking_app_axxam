import { connectToDatabase } from '../lib/mongodb';
import type { Booking } from '../types';

export async function getUserBookings(userId: string): Promise<Booking[]> {
  const { db, client } = await connectToDatabase();
  try {
    const bookings = await db.collection('bookings')
      .find({ user_id: userId })
      .sort({ created_at: -1 })
      .toArray();
    return bookings as Booking[];
  } finally {
    await client.close();
  }
}

export async function createBooking(booking: Omit<Booking, '_id' | 'created_at'>): Promise<Booking> {
  const { db, client } = await connectToDatabase();
  try {
    const newBooking = {
      ...booking,
      created_at: new Date(),
      status: 'pending'
    };
    const result = await db.collection('bookings').insertOne(newBooking);
    return { ...newBooking, _id: result.insertedId } as Booking;
  } finally {
    await client.close();
  }
}

export async function updateBookingStatus(bookingId: string, status: 'confirmed' | 'cancelled'): Promise<boolean> {
  const { db, client } = await connectToDatabase();
  try {
    const result = await db.collection('bookings').updateOne(
      { _id: bookingId },
      { $set: { status } }
    );
    return result.modifiedCount > 0;
  } finally {
    await client.close();
  }
}