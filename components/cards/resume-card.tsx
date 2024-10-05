import { useRouter } from 'next/navigation';
import { UserPen, Download, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Experience from '@/components/preview/experience';
import Education from '@/components/preview/education';
import Skills from '@/components/preview/skills';
import Summary from '@/components/preview/summary';
import PersonalDetails from '@/components/preview/personal-details';
import { useResume, type ResumeType } from '@/context';

type ResumeCardProps = {
  resume: ResumeType; 
};

export default function ResumeCard({ resume }: ResumeCardProps) {
  const router = useRouter();
  const { deleteResume } = useResume();
  return (
    <section 
      className="relative shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
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
      <div className="line-clamp-3">
        <Skills resume={resume} print={true} />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4">
          <Button onClick={() => router.push(`/dashboard/resume/edit/${resume._id}`)}>
            <UserPen />
          </Button>
          <Button onClick={() => router.push(`/dashboard/resume/download/${resume._id}`)}>
            <Download />
          </Button>
          <Button onClick={deleteResume.bind(null, resume?._id as string)}>
            <Trash/>
          </Button>
        </div>
      </div>
    </section>
  );
}