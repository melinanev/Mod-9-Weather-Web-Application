import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

// Import the routes
import weatherRoutes from './routes/api/weatherRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files of the entire client dist folder
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implement middleware to connect the routes
app.use('/api/weather', weatherRoutes);

// Catch-all route to return the index.html file
app.get('*', (req: Request, res: Response) => {
  console.log(`Received request for URL: ${req.url}`); // Use req parameter
  const indexPath = path.resolve(__dirname, '../../client/dist/index.html');
  console.log(`Serving index.html from: ${indexPath}`);
  res.sendFile(indexPath);
});

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

