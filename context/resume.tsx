"use client";

import { 
  createContext, 
  useContext,
  useEffect, 
  useState, 
  type ReactNode 
} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { saveResumeToDb, getUserResumeFromDb } from '@/actions/resume';

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
}

type ResumeContextType = {
  step: number;
  setStep: (step: number) => void;
  resume: ResumeType;
  resumes: ResumeType[];
  setResume: (cb: (value: ResumeType) => ResumeType) => void;
  saveResume: () => void;
}

const initialState: ResumeType = {
  name: '',
  job: '',
  address: '',
  phone: '',
  email: '',
  themeColor: ''
};

const ResumeContext = createContext<ResumeContextType>({
  step: 1,
  resume: initialState,
  resumes: [],
  setResume: () => {},
  setStep: () => {},
  saveResume: () => {}
});

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [resume, setResume] = useState<ResumeType>(initialState);
  const [resumes, setResumes] = useState<ResumeType[]>([]);
  const [step, setStep] = useState<number>(1);

  const router = useRouter();

  async function saveResume() {
    try {
      const data = await saveResumeToDb(resume);
      setResume(data);
      toast.success("Resume Saved successfully");
      router.push(`/dashboard/resume/edit/${data._id}`);
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

  useEffect(() => {
    const savedResume = localStorage.getItem("ak-resume-generator");
    if (savedResume) setResume(JSON.parse(savedResume));
  }, []);

  // fetch resumes for dashboard
  useEffect(() => {
    getUserResumes();
  }, []);
  return (
    <ResumeContext.Provider 
      value={{ 
        step, 
        setStep, 
        resume, 
        resumes,
        setResume, 
        saveResume 
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);