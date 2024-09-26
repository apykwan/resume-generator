'use client';

import { type ChangeEvent, type MouseEvent } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResume, type ResumeType } from '@/context/resume';

export default function StepOneCreate() {
  const { resume, setResume, saveResume } = useResume();
  const { isSignedIn } = useUser();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setResume((prevState: ResumeType) => {
      const updatedResume = { ...prevState, [name]: value };

      // save the inputs to localStorage
      localStorage.setItem("ak-resume-generator", JSON.stringify(updatedResume));

      return updatedResume;
    });
  }

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!resume.name || !resume.job || !resume.phone || !resume.email) return;
    // save resume to db
    saveResume();
  }

  return (
    <section className="w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
      <form>
        <h2 className="text-2xl font-bold mb-5">Personal Information</h2>
        <Input 
          className="mb-3" 
          value={resume.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
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
          onChange={handleChange}
          spellCheck={false}
          type="text"
          required 
        />
        <Input 
          className="mb-3" 
          value={resume.address}
          name="address"
          placeholder="Address"
          onChange={handleChange}
          spellCheck={false}
          type="text"
        />
        <Input 
          className="mb-3" 
          value={resume.phone}
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          spellCheck={false}
          type="number"
          required 
        />
        <Input 
          className="mb-3" 
          value={resume.email}
          name="email"
          placeholder="email"
          onChange={handleChange}
          spellCheck={false}
          type="email"
          required 
        />
        <div className="flex justify-end">
          {!isSignedIn ? (
            <SignInButton>
              <Button>Sign in to Save</Button>
            </SignInButton>
          ) : (
            <Button onClick={e => handleSubmit(e)}>Save</Button>
          )}
        </div>
      </form>
    </section>
  );
}