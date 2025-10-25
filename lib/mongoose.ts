import mongoose, { Mongoose } from "mongoose";

import logger from "./logger";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info("Using existing mongoose connection");
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "devFlow",
      })
      .then((result) => {
        // console.log("Connected to MongoDB");
        logger.info("Connecterd to Mongodb");
        return result;
      })
      .catch((error) => {
        // console.error("Eror connecting to Mongodb", error);
        logger.error("Eror connecting to Mongodb", error);
        throw error;
      });
  }
  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
