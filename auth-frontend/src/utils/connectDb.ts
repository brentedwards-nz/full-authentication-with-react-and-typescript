import mongoose from "mongoose";
import { cache } from "react";

if(!process.env.DATABASE_URL) {
  throw new Error('Cannot find env.DATABASE_URL');
}

const DATABASE_URL: string = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
}

let cached = globalWithMongoose.mongoose;

if(!cached) {
  cached = globalWithMongoose.mongoose = { conection: null, promise: null};
}

async function connectDb() {
  if(cached.connection){
    return cached.conection
  }

  if(!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedtopology: true,
    };
    cached.promise = mongoose
    .connect(DATABASE_URL, options)
    .then((mongoose) => {
      console.log('Mongoose connected...');
      return mongoose;
    }).
    catch((error) => {
      console.log(error as Error);
    });
  }
  cached.connection = await cached.promise;
    console.log("Mongoose connecting...");
    return cached.connection;
}

export default connectDb;