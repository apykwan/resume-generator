"use client";

import { useState, useEffect } from 'react';
import { FaShareAlt, FaPrint, FaDownload } from "react-icons/fa";

import ResumeCard from '@/components/cards/resume-card';
import { Button } from '@/components/ui/button';
import { useResume, type ResumeType } from '@/context';

type DownloadPageProps = {
  params: {
    _id: string
  }
};

export default function DownloadPage({ params }: DownloadPageProps) {
  const { resumes } = useResume();
  const [currResume, setCurrResume] = useState<ResumeType>();
  
  useEffect(() => {
    if (resumes.length > 0 && params._id) {
      const resume = resumes.find(r => r._id === params._id);
      setCurrResume(resume);
    }
  }, [params._id]);
  return (
    <main className="flex flex-col justify-center items-center p-10 min-h-screen overlfow-auto">
      <section className="text-center w-full md:w-1/2">
        <h2 className="font-bold text-lg">
         Your Resume Is Ready To Be Downloaded!
        </h2>
        <div className="flex justify-between space-x-3 my-5">
          <Button>
            <FaDownload />
            <span className="ml-2 uppercase">Download</span>
          </Button>
          <Button>
            <FaPrint />
            <span className="ml-2 uppercase">Print</span>
          </Button>
          <Button>
            <FaShareAlt />
            <span className="ml-2 uppercase">Share</span>
          </Button>
        </div>
        <div className="my-20">
          {currResume && <ResumeCard resume={currResume} />}
        </div>
      </section>
      
      
    </main>
  );
}