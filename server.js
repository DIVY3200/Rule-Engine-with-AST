import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import ruleRoutes from './routes/ruleRoutes.js'; // Note the .js extension
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Configure dotenv

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for PORT

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Check if MONGO_URL is defined
if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is not defined in the environment variables");
  process.exit(1); // Exit the application if MONGO_URL is not set
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, // Optional
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });

// Route for serving the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html')); // Use process.cwd() for absolute path
});

app.use('/api/rules', ruleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
