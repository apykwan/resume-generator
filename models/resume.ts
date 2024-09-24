import { Schema, model, models } from 'mongoose';

import {
  type Experience,
  type Education,
  type Skill,
  type Resume
} from './types';

const ExperienceSchema = new Schema<Experience>({
  title: String,
  company: String,
  address: String,
  startDate: String,
  endDate: String,
  summary: String,
});

const EducationSchema = new Schema<Education>({
  name: String,
  address: String,
  qualification: String,
  year: String,
});

const SkillSchema = new Schema<Skill>({
  name: String,
  level: String,
});

const ResumeSchema = new Schema<Resume>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    title: String,
    name: String,
    job: String,
    address: String,
    phone: String,
    email: String,
    themeColor: String,
    summary: String,
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillSchema],
  },
  { timestamps: true }
);

const Resume = models.Resume || model("Resume", ResumeSchema);
export default Resume;
