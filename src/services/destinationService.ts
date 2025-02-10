import { connectToDatabase } from '../lib/mongodb';
import type { Destination } from '../types';

export async function getAllDestinations(): Promise<Destination[]> {
  const { db, client } = await connectToDatabase();
  try {
    const destinations = await db.collection('destinations').find().toArray();
    return destinations as Destination[];
  } finally {
    await client.close();
  }
}

export async function getDestinationById(id: string): Promise<Destination | null> {
  const { db, client } = await connectToDatabase();
  try {
    const destination = await db.collection('destinations').findOne({ _id: id });
    return destination as Destination;
  } finally {
    await client.close();
  }
}

export async function createDestination(destination: Omit<Destination, '_id' | 'created_at'>): Promise<Destination> {
  const { db, client } = await connectToDatabase();
  try {
    const newDestination = {
      ...destination,
      created_at: new Date()
    };
    const result = await db.collection('destinations').insertOne(newDestination);
    return { ...newDestination, _id: result.insertedId } as Destination;
  } finally {
    await client.close();
  }
}