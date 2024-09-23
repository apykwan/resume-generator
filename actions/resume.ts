'user server';

import db from '@/utils/db';
import Resume from '@/models/resume';
import { currentUser } from '@clerk/nextjs/server';

export async function saveResumeToDb(data: any) {
  try {
    db();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error occurred:", err.message);
      throw err;
    }
    console.error("An unexpected error occurred:", err);
  }
}