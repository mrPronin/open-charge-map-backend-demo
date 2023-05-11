import mongoose from 'mongoose';

export const connect = async () => {
  const {
    MONGODB_URI,
    MONGO_DB,
  } = process.env;

  if (
    !MONGODB_URI ||
    !MONGO_DB
  ) {
    throw new Error('Required MongoDB environment variables are missing.');
  }

  const url = `${MONGODB_URI}/${MONGO_DB}?authSource=admin`;

  try {
    // await mongoose.connect(url, { connectTimeoutMS: 10000 });
    console.log(`url: ${url}`)
    await mongoose.connect(url);
    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};
