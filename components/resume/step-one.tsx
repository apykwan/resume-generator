'use client';

import { type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResume } from '@/context/resume';

export default function StepOne() {
  // context
  const { resume, setResume } = useResume();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (!resume.name || !resume.job || !resume.phone || !resume.email) return;
    setResume({
      ...resume,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(resume);
    // save resume to db
    // go to the next step
  }

  return (
    <div className="w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          className="mb-3" 
          value={resume.name}
          name="name"
          placeholder="name"
          onChange={e => onChange(e)}
          spellCheck={false}
          type="text"
          autoFocus 
          required 
        />
        <Input 
          className="mb-3" 
          value={resume.job}
          name="job"
          placeholder="Job"
          onChange={e => onChange(e)}
          spellCheck={false}
          type="text"
          required 
        />
        <Input 
          className="mb-3" 
          value={resume.address}
          name="address"
          placeholder="Address"
          onChange={e => onChange(e)}
          spellCheck={false}
          type="text"
        />
        <Input 
          className="mb-3" 
          value={resume.phone}
          name="phone"
          placeholder="Phone Number"
          onChange={e => onChange(e)}
          spellCheck={false}
          type="number"
          required 
        />
        <Input 
          className="mb-3" 
          value={resume.email}
          name="email"
          placeholder="email"
          onChange={e => onChange(e)}
          spellCheck={false}
          type="email"
          required 
        />
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
}