"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaShareAlt, FaPrint, FaDownload } from "react-icons/fa";

import { getResumeFromDb } from '@/actions/resume';
import ResumeCard from '@/components/cards/resume-card';
import { Button } from '@/components/ui/button';
import { type ResumeType } from '@/context';

type DownloadPageProps = {
  params: {
    _id: string
  }
};

export default function DownloadPage({ params }: DownloadPageProps) {
  const [currResume, setCurrResume] = useState<ResumeType>();

  function printResume() {
    if (typeof window === "undefined") return;

    const newWindow = window.open(`/resume/${currResume?._id as string}`, "_blank");
    if (newWindow){
      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 300)
      };
    }
  }

  function shareButton() {
    if (!currResume) return;

    navigator.clipboard.writeText(`${window.location.origin}/resume/${currResume._id}`);
    toast.success("Link copied to clipboard!");
  }

  useEffect(() => {
    const fetchResume = async () => {
      if (params._id) {
        const resume = await getResumeFromDb(params._id);
        if (resume) setCurrResume(resume); 
      }
    };

    fetchResume();
  }, [params._id]);
  return (
    <main className="flex flex-col justify-center items-center p-10 min-h-screen overlfow-auto">
      <section className="text-center w-full md:w-1/2">
        <h2 className="font-bold text-lg">
         Your Resume Is Ready To Be Downloaded, Printed And Shared!
        </h2>
        <div className="flex justify-between space-x-3 my-5">
          <Button onClick={printResume}>
            <FaDownload />
            <span className="ml-2 uppercase">Download</span>
          </Button>
          <Button onClick={printResume}>
            <FaPrint />
            <span className="ml-2 uppercase">Print</span>
          </Button>
          <Button onClick={shareButton}>
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