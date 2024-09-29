import dynamic from 'next/dynamic';
import { ArrowRight, Plus, X, Loader2Icon, Brain } from 'lucide-react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResume } from '@/context/resume';

export default function StepThree() {
  const {
    experienceList,
    handleExperienceChange,
    handleExperienceQuillChange,
    handleExperienceSubmit,
    addExperience,
    removeExperience,
    handleExperienceGenerateWithAi
  } = useResume();
  return (
    <div>Three</div>
  );
}