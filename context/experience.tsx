"use client";

import { 
  createContext, 
  useContext,
  useEffect, 
  useState, 
  type ReactNode,
  type ChangeEvent, 
} from 'react';
import toast from 'react-hot-toast';

import { useResume } from './resume';
import { updateExperienceToDb } from '@/actions/resume';
import { runAi } from '@/actions/ai';

type ResumeProviderProps ={
  children: ReactNode;
}

export type ExperienceType = {
  _id?: string;
  title: string;
  company: string;
  address?: string;
  startDate: string;
  endDate: string;
  summary?: string;
};

type ExperienceContextType = {
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

const ExperienceContext = createContext<ExperienceContextType>({
  experienceList: [],
  experienceLoading: {},
  handleExperienceChange: () => {},
  handleExperienceQuillChange: () => {},
  handleExperienceSubmit: () => {},
  addExperience: () => {},
  removeExperience: () => {},
  handleExperienceGenerateWithAi: () => {}
});

export function ExperienceProvider({ children }: ResumeProviderProps) {
  const { setStep, resume, setResume } = useResume();
  const [experienceList, setExperienceList] = useState<ExperienceType[]>([experienceField]);
  const [experienceLoading, setExperienceLoading] = useState({});


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
      toast.error("Failed to update experience");
    }
  }

  function addExperience() {
    const newExperience = { ...experienceField };
    setExperienceList(prevState => {
      return [...prevState, newExperience];
    });

    setResume((prevState) => ({
      ...prevState,
      experience: [...experienceList, newExperience]
    }));
  }

  function removeExperience() {
    if (experienceList.length === 1) return;
    const newEntries = [...experienceList].slice(0, -1);
    setExperienceList(newEntries);
    // update the db 
    updateExperience(newEntries);
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
    if (resume.experience && resume.experience.length > 0) {
      setExperienceList(resume?.experience);
    }
  }, [resume]);

  return (
    <ExperienceContext.Provider 
      value={{ 
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
    </ExperienceContext.Provider>
  );
}

export const useExperience = () => useContext(ExperienceContext);