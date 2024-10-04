"use client";

import { 
  createContext, 
  useContext,
  useEffect, 
  useState, 
  type ReactNode,
} from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

import { 
  saveResumeToDb, 
  getUserResumeFromDb,
  getResumeFromDb,
  updateResumeFromDb,
} from '@/actions/resume';
import { ExperienceType, experienceField } from './experience';
import { EducationType, educationField } from './education';
import { SkillsType, skillsField } from './skills';

type ResumeProviderProps ={
  children: ReactNode;
}

export type ResumeType = {
  _id?: string;
  name: string;
  job: string;
  address: string;
  phone: string;
  email: string;
  themeColor?: string;
  summary?: string;
  experience?: ExperienceType[];
  skills?: SkillsType[];
  education?: EducationType[];
};

type ResumeContextType = {
  step: number;
  setStep: (step: number) => void;
  resume: ResumeType;
  resumes: ResumeType[];
  setResume: (cb: (value: ResumeType) => ResumeType) => void;
  saveResume: () => void;
  updateResume: () => void;
}

const initialState: ResumeType = {
  name: '',
  job: '',
  address: '',
  phone: '',
  email: '',
  themeColor: '#cc005f',
  experience: [experienceField],
  skills: [skillsField],
  education: [educationField]
};

const ResumeContext = createContext<ResumeContextType>({
  step: 1,
  resume: initialState,
  resumes: [],
  setResume: () => {},
  setStep: () => {},
  saveResume: () => {},
  updateResume: () => {},
});

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [resume, setResume] = useState<ResumeType>(initialState);
  const [resumes, setResumes] = useState<ResumeType[]>([]);
  const [step, setStep] = useState<number>(5);

  const router = useRouter();
  const { _id } = useParams();
  const pathname = usePathname();

  async function saveResume() {
    try {
      const data = await saveResumeToDb(resume);
      setResume(data);
      toast.success("Resume Saved successfully");
      router.push(`/dashboard/resume/edit/${data._id}`);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume");
    }
  }

  async function getUserResumes() {
    try {
      const data = await getUserResumeFromDb();
      setResumes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume");
    }
  }

  async function getResume(_id: string) {
    try {
      const data = await getResumeFromDb(_id);
      setResume(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume");
    }
  }

  async function updateResume() {
    try {
      const data = await updateResumeFromDb(resume);
      setResume(data);
      toast.success("Resume Updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update resume");
    }
  }

  // useEffect(() => {
  //   if (pathname?.includes('/resume/create')) {
  //     setResume(initialState);
  //     setStep(1);
  //   }
  // }, [pathname]); 

  useEffect(() => {
    const savedResume = localStorage.getItem("ak-resume-generator");
    if (savedResume) setResume(JSON.parse(savedResume));
  }, []);

  // fetch resumes for dashboard
  useEffect(() => {
    getUserResumes();
  }, []);

  useEffect(() => {
    if (_id) getResume(_id as string);
  }, [_id]);
  return (
    <ResumeContext.Provider 
      value={{ 
        step, 
        setStep, 
        resume, 
        resumes,
        setResume, 
        saveResume,
        updateResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);