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

import { updateEducationToDb } from '@/actions/resume';
import { useResume } from './index';

type EducationProviderProps ={
  children: ReactNode;
}

export type EducationType = {
  _id?: string;
  name: string;
  address: string;
  qualification?: string;
  year?: string;
};

type EducationContextType = {
  educationList: EducationType[],
  handleEducationChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleEducationSubmit: () => void;
  addEducation: () => void;
  removeEducation: () => void;
}

export const educationField: EducationType = {
  name: '',
  address: '',
  qualification: '',
  year: '',
};

const EducationContext = createContext<EducationContextType>({
  educationList: [],
  handleEducationChange: () => {},
  handleEducationSubmit: () => {},
  addEducation: () => {},
  removeEducation: () => {}
});

export function EducationProvider({ children }: EducationProviderProps) {
  const { setStep, resume, setResume } = useResume();

  const [educationList, setEducationList] = useState<EducationType[]>([educationField]);

  async function updateEducation(educationList: EducationType[]) {
    try {
      const data = await updateEducationToDb({ 
        ...resume, 
        education: educationList 
      });
      setResume(data);
      toast.success("Education Updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update education");
    }
  }

  function handleEducationChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = e.target;
    const newEntries = [...educationList];
    newEntries[index] = { 
      ...newEntries[index], 
      [name]: value 
    };
    setEducationList(newEntries);
  }

  function handleEducationSubmit() {
    updateEducation(educationList);
    setStep(5);
  }

  function addEducation() {
    const newEducation = { ...educationField };
    setEducationList(prevState => {
      return [...prevState, newEducation];
    });

    setResume((prevState) => ({
      ...prevState,
      education: [...educationList, newEducation]
    }));
  }

  function removeEducation() {
    if (educationList.length === 1) return;
    const newEntries = [...educationList].slice(0, -1);
    setEducationList(newEntries);
    // update the db 
  }

  useEffect(() => {
    if (resume.education) {
      setEducationList(resume?.education);
    }
  }, [resume]);
  return (
    <EducationContext.Provider 
      value={{ 
        educationList,
        handleEducationChange,
        handleEducationSubmit,
        addEducation,
        removeEducation
      }}
    >
      {children}
    </EducationContext.Provider>
  );
}

export const useEducation = () => useContext(EducationContext);