'use client';

import { twMerge } from 'tailwind-merge'
import { useResume } from '@/context/resume';
import { Button } from '@/components/ui/button';

export default function ResumeCreateNav() {
  const { step, setStep } = useResume();

  function convertBtnValueToNum(btn: string): number {
    let btnValue = 0;
    if (btn === "I") btnValue = 1;
    if (btn === "II") btnValue = 2;
    if (btn === "III") btnValue = 3;
    if (btn === "IV") btnValue = 4;
    if (btn === "V") btnValue = 5;

    return btnValue;
  }

  function activeBtn (btn: string): string {
    return step === convertBtnValueToNum(btn) 
      ? "bg-primary text-slate-200 dark:text-slate-800" 
      : "bg-secondary text-gray-700 dark:text-gray-400";
  }

  const btnClasses = "w-10 h-10 flex items-center justify-center rounded-full transition hover:bg-primary hover:text-slate"

  function handleClick(item: string) {
    setStep(convertBtnValueToNum(item));
  }

  return (
    <nav className="flex justify-center w-full py-4">
      <div className="flex space-x-4">
        {["I", "II", "III", "IV", "V"].map((item) => (
          <Button 
            key={item} 
            className={twMerge(btnClasses, activeBtn(item))}
            disabled={step < convertBtnValueToNum(item)}
            onClick={handleClick.bind(null, item)}
          >
            {item}
          </Button>  
        ))}
      </div>
    </nav>
  );
}