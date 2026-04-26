import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// In development, attach to a global so HMR doesn't create new connections on every reload.
// In production, the module is loaded once and the single client is reused.
const globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
};

export default process.env.NODE_ENV === "development"
  ? (globalWithMongo._mongoClient ??= client)
  : client;
