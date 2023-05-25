import mongoose from 'mongoose';

export const connect = async (dbURI?: string) => {
  if (!dbURI) {
    throw new Error('Required MongoDB environment variables are missing.');
  }

  const url = `${dbURI}`;

  try {
    await mongoose.connect(url);
    // console.log('Connected to MongoDB successfully.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};
