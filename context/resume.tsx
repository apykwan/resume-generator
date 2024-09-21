"use client";

import { 
  createContext, 
  useContext, 
  useState, 
  type ReactNode 
} from 'react';

type ResumeProviderProps ={
  children: ReactNode;
}

type ResumeType = {
  name: string;
  job: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
}

type ResumeContextType = {
  step: number;
  setStep: (step: number) => void;
  resume: ResumeType;
  setResume: (resume: ResumeType) => void;
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
  setResume: () => {},
  setStep: () => {}
});

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [resume, setResume] = useState<ResumeType>(initialState);
  const [step, setStep] = useState<number>(1);
  return (
    <ResumeContext.Provider value={{ step, setStep, resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);