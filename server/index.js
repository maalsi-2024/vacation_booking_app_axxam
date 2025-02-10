import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Middleware pour la connexion à MongoDB
async function connectDB(req, res, next) {
  try {
    await client.connect();
    req.db = client.db("axxam");
    next();
  } catch (error) {
    res.status(500).json({ error: "Erreur de connexion à la base de données" });
  }
}

// Routes pour les destinations
app.get('/api/destinations', connectDB, async (req, res) => {
  try {
    const destinations = await req.db.collection('destinations').find().toArray();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des destinations" });
  }
});

app.get('/api/destinations/:id', connectDB, async (req, res) => {
  try {
    const destination = await req.db.collection('destinations').findOne({
      _id: new ObjectId(req.params.id)
    });
    if (!destination) {
      return res.status(404).json({ error: "Destination non trouvée" });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de la destination" });
  }
});

// Routes pour les réservations
app.get('/api/bookings/:userId', connectDB, async (req, res) => {
  try {
    const bookings = await req.db.collection('bookings')
      .find({ user_id: req.params.userId })
      .sort({ created_at: -1 })
      .toArray();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des réservations" });
  }
});

app.post('/api/bookings', connectDB, async (req, res) => {
  try {
    const booking = {
      ...req.body,
      created_at: new Date(),
      status: 'pending'
    };
    const result = await req.db.collection('bookings').insertOne(booking);
    res.status(201).json({ ...booking, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la réservation" });
  }
});

app.patch('/api/bookings/:id/status', connectDB, async (req, res) => {
  try {
    const { status } = req.body;
    const result = await req.db.collection('bookings').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Réservation non trouvée" });
    }
    res.json({ message: "Statut mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du statut" });
  }
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur est survenue sur le serveur" });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});