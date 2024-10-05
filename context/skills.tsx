"use client";

import { 
  createContext, 
  useContext,
  useEffect, 
  useState, 
  type ReactNode,
  type ChangeEvent, 
} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { useResume } from './index';
import { updateSkillsToDb } from '@/actions/resume';

type ResumeProviderProps ={
  children: ReactNode;
}

export type SkillsType = {
  _id?: string;
  name: string;
  level: string;
};

type SkillsContextType = {
  skillsList: SkillsType[];
  handleSkillsNameChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleSkillsLevelChange: (level: string, index: number) => void;
  handleSkillsSubmit: () => void;
  addSkills: () => void;
  removeSkills: () => void;
}

export const skillsField: SkillsType = {
  name: "",
  level: ""
};

const SkillsContext = createContext<SkillsContextType>({
  skillsList: [],
  handleSkillsNameChange: () => {},
  handleSkillsLevelChange: () => {},
  handleSkillsSubmit: () => {},
  addSkills: () => {},
  removeSkills: () => {},
});

export function SkillsProvider({ children }: ResumeProviderProps) {
  const { resume, setResume } = useResume();
  const router = useRouter();
  const [skillsList, setSkillsList] = useState<SkillsType[]>([skillsField]);

  function handleSkillsNameChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    const newEntries = [...skillsList];
    newEntries[index] = { 
      ...newEntries[index], 
      name: value 
    };
    setSkillsList(newEntries);
  }

  function handleSkillsLevelChange(level: string, index: number) {
    const newEntries = [...skillsList];
    newEntries[index] = { 
      ...newEntries[index], 
      level
    };
    setSkillsList(newEntries);
  }

  function handleSkillsSubmit() {
    updateSkills(skillsList);
    router.push(`/dashboard/resume/download/${resume._id}`);
  }

  async function updateSkills(skillsList: SkillsType[]) {
    try {
      const invalidSkills = skillsList.filter((
        skill => !skill.name || !skill.level
      ));

      if (invalidSkills.length > 0) {
        toast.error("Please fill in both skill name and level");
        return;
      }

      const data = await updateSkillsToDb({ 
        ...resume, 
        skills: skillsList 
      });
      setResume(data);
      toast.success("Skills Updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Skills");
    }
  }

  function addSkills() {
    const newSkills = { ...skillsField };
    setSkillsList(prevState => {
      return [...prevState, newSkills];
    });

    setResume((prevState) => ({
      ...prevState,
      skills: [...skillsList, newSkills]
    }));
  }

  function removeSkills() {
    if (skillsList.length === 1) return;
    const newEntries = [...skillsList].slice(0, -1);
    setSkillsList(newEntries);
    // update the db 
    updateSkills(newEntries);
  }

  useEffect(() => {
    if (resume.skills) {
      setSkillsList(resume?.skills);
    }
  }, [resume]);
  return (
    <SkillsContext.Provider 
      value={{ 
        skillsList,
        handleSkillsNameChange,
        handleSkillsLevelChange,
        handleSkillsSubmit,
        addSkills,
        removeSkills,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
}

export const useSkills = () => useContext(SkillsContext);