import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb://localhost:27017";

// Création du client MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connexion à la base de données
export async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("axxam");
    return { db, client };
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    throw error;
  }
}

// Fermeture de la connexion
export async function closeDatabaseConnection() {
  await client.close();
}