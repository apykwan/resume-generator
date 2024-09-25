import Link from 'next/link';

import PersonalDetails from '@/components/preview/personal-details';
import { type ResumeType } from '@/context/resume';

type ResumeCardProps = {
  resume: ResumeType; 
};

export default function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Link href={`/dashboard/resume/edit/${resume._id}`}>
      <div 
        className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
        style={{ borderColor: resume?.themeColor }}
      >
        <PersonalDetails resume={resume} />
      </div>
    </Link>
  );
}