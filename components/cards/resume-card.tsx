import Link from 'next/link';

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
        className="shadow-lg h-[200px] w-full rounded-xl p-5 border-t-[20px]"
        style={{ borderColor: resume?.themeColor }}
      >
        <PersonalDetails resume={resume} />
        <Summary resume={resume} />
      </div>
    </Link>
  );
}