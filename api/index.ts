
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

dotenv.config();

// 1. Initialize Express and HTTP Server
const app = express();
const httpServer = http.createServer(app);
// 2. Set up Apollo Server
app.use(cors())
app.use(express.json())
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// 3. Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URL!)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await server.start();

   

    // 5. YOUR CUSTOM REST ROUTE (The one we missed!)
    app.get('/api', (req, res) => {
      res.json({ 
        message: "Wish and Surprise API is running", 
        database: "Connected to MongoDB Atlas" 
      });
    });

    // 6. GraphQL Endpoint
    app.use('/graphql', expressMiddleware(server));

    // 7. Start the unified server
    const PORT = 4000;
    httpServer.listen({ port: PORT }, () => {
      console.log(`API Route: http://localhost:${PORT}/api`);
      console.log(`GraphQL: http://localhost:${PORT}/graphql`);
    });
  })
  .catch(err => console.error("❌ DB Connection Error:", err));
