import { type ChangeEvent, type MouseEvent } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useResume } from '@/context/resume';

export default function StepTwo() {
  const { resume, setResume, updateResume, setStep } = useResume();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setResume(prevState => ({
      ...prevState,
      summary: e.target.value
    }));
  }

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    updateResume();
    setStep(3);
  }

  return (
    <section className="w-full md:w-1/2 p-5 shadow -lg border-t-4 rounded-lg space-y-3">
      <h2 className="text-2xl font-bold mg-5">Summary</h2>
      <form>
        <Textarea
          className="mb-3"
          placeholder="Write a summary about yourself" 
          onChange={handleChange} 
          value={resume.summary}
          rows={10}
          required  
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Next</Button>
        </div>
      </form>
    </section>
  );
}