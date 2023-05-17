import mongoose from 'mongoose';

export const connect = async (dbURI?: string, dbName?: string) => {
  if (!dbURI || !dbName) {
    throw new Error('Required MongoDB environment variables are missing.');
  }

  const url = `${dbURI}/${dbName}?authSource=admin`;

  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};
