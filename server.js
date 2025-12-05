import express from 'express';
import publishRoutes from './src/routes/publishRoutes.js';
import { disconnectProducer } from './src/services/kafkaService.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', publishRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const gracefulShutdown = async () => {
  console.log('\nShutting down server...');
  await disconnectProducer();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);