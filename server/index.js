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

async function connectDB(req, res, next) {
  try {
    await client.connect();
    req.db = client.db("Axxam");
    next();
  } catch (error) {
    res.status(500).json({ error: "Erreur de connexion à la base de données" });
  }
}

// Add these routes to your Express server

// Routes pour l'authentification
app.post('/api/auth/register', connectDB, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await req.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    // Créer le nouvel utilisateur
    const user = {
      email,
      password, // Note: In production, hash the password!
      name,
      createdAt: new Date()
    };
    
    const result = await req.db.collection('users').insertOne(user);
    res.status(201).json({ 
      _id: result.insertedId,
      email,
      name 
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
});

app.post('/api/auth/login', connectDB, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await req.db.collection('users').findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    res.json({
      _id: user._id,
      email: user.email,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
});

// Routes pour les offres
app.get('/api/offers', connectDB, async (req, res) => {
  try {
    const offers = await req.db.collection('offers').find().toArray();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des offres" });
  }
});

app.get('/api/offers/:id', connectDB, async (req, res) => {
  try {
    const offer = await req.db.collection('offers').findOne({ _id: new ObjectId(req.params.id) });
    if (!offer) {
      return res.status(404).json({ error: "Offre non trouvée" });
    }
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de l'offre" });
  }
});

// Routes pour les réservations (bookings)
app.get('/api/bookings/:user_id', connectDB, async (req, res) => {
  try {
    const bookings = await req.db.collection('bookings')
      .find({ user: new ObjectId(req.params.user_id) })
      .sort({ date: -1 })
      .toArray();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des réservations" });
  }
});

app.post('/api/bookings', connectDB, async (req, res) => {
  try {
    const booking = {
      user: new ObjectId(req.body.user),
      offer: new ObjectId(req.body.offer),
      date: new Date(req.body.date),
      status: "En attente"
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

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});