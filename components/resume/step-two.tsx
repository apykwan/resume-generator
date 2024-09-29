import { useState, type MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';
import { Brain, Loader2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { Button } from '@/components/ui/button';
import { useResume } from '@/context/resume';
import { runAi } from '@/actions/ai';

export default function StepTwo() {
  const [loading, setLoading] = useState<boolean>(false);
  const { resume, setResume, updateResume, setStep } = useResume();

  function handleChange(content: any) {
    setResume(prevState => ({
      ...prevState,
      summary: content
    }));
  }

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    updateResume();
    setStep(3);
  }

  const aiGenerateCommand = `Generate a resume summary for a person with the following details: ${JSON.stringify(resume)} in plain text format`;
  async function handleGenerateWithAi() {
    setLoading(true);
    if (!resume.job) {
      toast.error('Please fill in your job title or write something about yourself');
      setLoading(false);
      return;
    }
    const response = await runAi(aiGenerateCommand);
    setResume(prevState => ({
      ...prevState,
      summary: response
    }));
    setLoading(false);
  }
  return (
    <section 
      className={twMerge('w-full p-5 shadow-lg border-t-4 rounded-lg', 'dark:border-2')}
      style={{ borderColor: resume?.themeColor }}
    >
      <div className="flex justify-between">
        <h2 
          className="text-2xl font-bold mg-5"
          style={{ color: resume?.themeColor }}
        >
          Summary
        </h2>
        <Button 
          variant="destructive" 
          onClick={handleGenerateWithAi}
          disabled={loading}
        >
          {loading 
            ? <Loader2Icon size={18} className="mr-2 animate-spin" /> 
            : <Brain size={18} className="mr-2" /> 
          }
          AI Assistant
        </Button>
      </div>
      
      <form>
        <ReactQuill 
          theme="snow"
          onChange={handleChange}
          value={resume.summary}
          className="my-3"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Next</Button>
        </div>
      </form>
    </section>
  );
}