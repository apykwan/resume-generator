import Link from 'next/link';

import Summary from '@/components/preview/summary';
import PersonalDetails from '@/components/preview/personal-details';
import { useResume } from '@/context/resume';


export default function PreviewCard() {
  const { resume } = useResume();
  return (
    <div 
      className="shadow-lg h-[200px] w-full rounded-xl p-5 border-t-[20px]"
      style={{ borderColor: resume?.themeColor }}
    >
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
    </div>
  );
}