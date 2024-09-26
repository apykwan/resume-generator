'use server';

import db from '@/utils/db';
import Resume from '@/models/resume';
import { currentUser } from '@clerk/nextjs/server';
import { type ResumeType } from '@/context/resume';

export async function checkOwnership(resumeId: string) {
  try {
    // get current user
    const user = await currentUser();
    const userEmail  = user?.emailAddresses[0]?.emailAddress;

    // find the resume by id
    const resume = await Resume.findById(resumeId);
    if (!resume) throw new Error("Resume not found");
    if (resume.userEmail !== userEmail) throw new Error("Unauthorized");
    
    return true;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error occurred:", err.message);
      throw err;
    }
    console.error("An unexpected error occurred:", err);
  }
}

export async function saveResumeToDb(data: ResumeType) {
  try {
    db();
    const user = await currentUser();
    const userEmail  = user?.emailAddresses[0]?.emailAddress;

    if (data._id) delete data._id;
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

export async function getUserResumeFromDb() {
  try {
    db();
    const user = await currentUser();
    const userEmail  = user?.emailAddresses[0]?.emailAddress;

    const resume = await Resume
      .find({ userEmail })
      .select('-__v');
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error occurred:", err.message);
      throw err;
    }
    console.error("An unexpected error occurred:", err);
  }
}

export async function getResumeFromDb(_id: string) {
  try {
    db();
    const resume = await Resume
      .findById(_id)
      .select('-__v');
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error occurred:", err.message);
      throw err;
    }
    console.error("An unexpected error occurred:", err);
  }
}

export async function updateResumeFromDb(data: ResumeType) {
  try {
    db();
    const { _id, ...rest } = data;
    await checkOwnership(_id as string);

    const resume = await Resume.findByIdAndUpdate(_id, { ...rest }, { new: true }); 
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error occurred:", err.message);
      throw err;
    }
    console.error("An unexpected error occurred:", err);
  }
}