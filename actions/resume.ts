'use server';

import db from '@/utils/db';
import Resume from '@/models/resume';
import { currentUser } from '@clerk/nextjs/server';
import { type ResumeType } from '@/context/resume';

export async function saveResumeToDb(data: ResumeType) {
  try {
    db();
    const user = await currentUser();
    const userEmail  = user?.emailAddresses[0]?.emailAddress;

    const resume = await Resume.create({...data, userEmail });
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error occurred:", err.message);
      throw err;
    }
    console.error("An unexpected error occurred:", err);
  }
}