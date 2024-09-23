export type Experience = {
  title: string;
  company: string;
  address: string;
  startDate: string;
  endDate: string;
  summary: string;
};

export type Education = {
  name: string;
  address: string;
  qualification: string;
  year: string;
};

export type Skill = {
  name: string;
  level: string;
};

export type Resume = {
  userEmail: string;
  title: string;
  name: string;
  job: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summary: string;
  experience: [Experience];
  education: [Education];
  skills: [Skill];
};