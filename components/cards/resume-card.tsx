import Link from 'next/link';

import Experience from '@/components/preview/experience';
import Education from '@/components/preview/education';
import Summary from '@/components/preview/summary';
import PersonalDetails from '@/components/preview/personal-details';
import { type ResumeType } from '@/context/resume';

type ResumeCardProps = {
  resume: ResumeType; 
};

export default function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Link href={`/dashboard/resume/edit/${resume._id}`}>
      <div 
        className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
        style={{ borderColor: resume?.themeColor }}
      >
        <div className="line-clamp-3">
          <PersonalDetails resume={resume} />
        </div>
        <div className="line-clamp-4">
          <Summary resume={resume} />
        </div>
        <div className="line-clamp-4">
          <Experience resume={resume} />
        </div>
        <div className="line-clamp-3">
          <Education resume={resume} />
        </div>
      </div>
    </Link>
  );
}