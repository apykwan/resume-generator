import mongoose from 'mongoose';

export default async function () {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.DATABASE!);
    console.log("Connected to database");
  } catch (err) {
    console.log(`DB connection Error: `, err);
  }
}