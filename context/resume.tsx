"use client";

import { 
  createContext, 
  useContext,
  useEffect, 
  useState, 
  type ReactNode 
} from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

import { 
  saveResumeToDb, 
  getUserResumeFromDb,
  getResumeFromDb,
  updateResumeFromDb 
} from '@/actions/resume';

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
  skills?: string[];
  education?: string[];
};

export type ExperienceType = {
  title: string;
  company: string;
  address?: string;
  startDate: string;
  endDate: string;
  summary?: string;
};

type ResumeContextType = {
  step: number;
  setStep: (step: number) => void;
  resume: ResumeType;
  resumes: ResumeType[];
  setResume: (cb: (value: ResumeType) => ResumeType) => void;
  saveResume: () => void;
  updateResume: () => void;
  experienceList: ExperienceType[];
  experienceLoading: boolean;
  handleExperienceChange: (e: any, index: any) => void;
  handleExperienceQuillChange: (value: any, index: any) => void;
  handleExperienceSubmit: () => void;
  addExperience: () => void;
  removeExperience: () => void;
  handleExperienceGenerateWithAi: () => void;
}

const expereinceField: ExperienceType = {
  title: '',
  company: '',
  address: '',
  startDate: '',
  endDate: '',
  summary: '',
};

const initialState: ResumeType = {
  name: '',
  job: '',
  address: '',
  phone: '',
  email: '',
  themeColor: '#cc005f',
  experience: [],
  skills: [],
  education: []
};

const ResumeContext = createContext<ResumeContextType>({
  step: 1,
  resume: initialState,
  resumes: [],
  setResume: () => {},
  setStep: () => {},
  saveResume: () => {},
  updateResume: () => {},
  experienceList: [],
  experienceLoading: false,
  handleExperienceChange: () => {},
  handleExperienceQuillChange: () => {},
  handleExperienceSubmit: () => {},
  addExperience: () => {},
  removeExperience: () => {},
  handleExperienceGenerateWithAi: () => {}
});

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [resume, setResume] = useState<ResumeType>(initialState);
  const [resumes, setResumes] = useState<ResumeType[]>([]);
  const [step, setStep] = useState<number>(1);
  const [experienceList, setExperienceList] = useState<ExperienceType[]>([]);
  const [experienceLoading, setExperienceLoading] = useState<boolean>(false);

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

  function handleExperienceChange(e: any, index:any) {

  }

  function handleExperienceQuillChange (value: any, index: any) {

  }

  function handleExperienceSubmit() {

  }

  function addExperience() {

  }

  function removeExperience() {

  }

  async function handleExperienceGenerateWithAi() {

  }

  useEffect(() => {
    if (pathname?.includes('/resume/create')) {
      setResume(initialState);
      setStep(1);
    }
  }, [pathname]); 

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

  useEffect(() => {
    if (resume.experience && resume.experience.length > 0) {
      setExperienceList(resume?.experience);
    }
  }, [resume]);
  return (
    <ResumeContext.Provider 
      value={{ 
        step, 
        setStep, 
        resume, 
        resumes,
        setResume, 
        saveResume,
        updateResume,
        experienceList,
        experienceLoading,
        handleExperienceChange,
        handleExperienceQuillChange,
        handleExperienceSubmit,
        addExperience,
        removeExperience,
        handleExperienceGenerateWithAi 
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);