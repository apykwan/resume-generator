'use client';

import { useResume } from '@/context/resume';
import StepOneCreate from '@/components/resume/step-one-create';
import StepTwo from '@/components/resume/step-two';
import StepThree from '@/components/resume/step-three';
import StepFour from '@/components/resume/step-four';
import StepFive from '@/components/resume/step-five';
import ResumeCreateNav from '@/components/nav/resume-create-nav';
import PreviewCard from '@/components/cards/preview-card';

export default function ResumeCreatePage() {
  const { step, resume } = useResume();
  return (
    <main className="flex flex-col lg:flex-row h-screen overflow-y-auto">
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:justify-center lg:items-center">
        <PreviewCard />
      </div>

      <div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:justify-center lg:items-start">
        <ResumeCreateNav />
        {step === 1 && <StepOneCreate />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        {step === 4 && <StepFour />}
        {step === 5 && <StepFive />}
      </div>
    </main>
  );
}