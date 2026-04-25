"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
dotenv_1.default.config();
// 1. Initialize Express and HTTP Server
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
// 2. Set up Apollo Server
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
// 3. Connect to MongoDB and Start Server
mongoose_1.default.connect(process.env.MONGO_URL)
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
    app.use('/graphql', (0, express5_1.expressMiddleware)(server));
    // 7. Start the unified server
    const PORT = 4000;
    httpServer.listen({ port: PORT }, () => {
        console.log(`API Route: http://localhost:${PORT}/api`);
        console.log(`GraphQL: http://localhost:${PORT}/graphql`);
    });
})
    .catch(err => console.error("❌ DB Connection Error:", err));
