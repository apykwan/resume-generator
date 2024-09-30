"use client";

import { 
  createContext, 
  useContext,
  useEffect, 
  useState, 
  type ReactNode,
  type ChangeEvent, 
} from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

import { 
  saveResumeToDb, 
  getUserResumeFromDb,
  getResumeFromDb,
  updateResumeFromDb,
  updateExperienceToDb 
} from '@/actions/resume';
import { runAi } from '@/actions/ai';

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
  experienceLoading: any;
  handleExperienceChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleExperienceQuillChange: (value: any, index: number) => void;
  handleExperienceSubmit: () => void;
  addExperience: () => void;
  removeExperience: () => void;
  handleExperienceGenerateWithAi: (index: number) => void;
}

const experienceField: ExperienceType = {
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
  experienceLoading: {},
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
  const [step, setStep] = useState<number>(3);
  const [experienceList, setExperienceList] = useState<ExperienceType[]>([experienceField]);
  const [experienceLoading, setExperienceLoading] = useState({});

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

  function handleExperienceChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = e.target;
    const newEntries = [...experienceList];
    newEntries[index] = { 
      ...newEntries[index], 
      [name]: value 
    };
    setExperienceList(newEntries);
  }

  function handleExperienceQuillChange (value: any, index: number) {
    const newEntries = [...experienceList];
    newEntries[index] = { 
      ...newEntries[index], 
      summary: value 
    };
    setExperienceList(newEntries);
  }

  function handleExperienceSubmit() {
    updateExperience(experienceList);
    setStep(4);
  }

  async function updateExperience(experienceList: ExperienceType[]) {
    try {
      const data = await updateExperienceToDb({ 
        ...resume, 
        experience: experienceList 
      });
      setResume(data);
      toast.success("Experience Updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update resume");
    }
  }

  function addExperience() {
    setExperienceList(prevState => {
      return [...prevState, experienceField]
    });
  }

  function removeExperience() {
    if (experienceList.length === 1) return;
    const newEntries = [...experienceList].slice(0, -1);
    setExperienceList(newEntries);
    // update the db 
  }

  async function handleExperienceGenerateWithAi(index: number) {
    setExperienceLoading(prevState => ({ ...prevState, [index]: true }));
    // get the index of the last experience entry

    const selectedExperience = experienceList[index];
    if (!selectedExperience || !selectedExperience.title) {
      toast.error("Please fill in the job details for the selected experience entry");
      setExperienceLoading(prevState => ({ ...prevState, [index]: false }));
      return;
    }

    const jobTitle = selectedExperience.title; 
    const jobSummary = selectedExperience.summary || '';  
    try {
      const aiGenerateCommand = `Generate a list of duties and responsibilities in HTML bullet points for ${jobTitle} ${jobSummary}, not in markdown format.`;
      const response = await runAi(aiGenerateCommand);

      const updatedExperienceList = [...experienceList];
      updatedExperienceList[index] = {
        ...selectedExperience,
        summary: response
      }

      setExperienceList(updatedExperienceList);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update resume");
    } finally {
      setExperienceLoading(prevState => ({ ...prevState, [index]: false }));
    }
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