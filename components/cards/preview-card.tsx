import Summary from '@/components/preview/summary';
import PersonalDetails from '@/components/preview/personal-details';
import Experience from '@/components/preview/experience';
import Education from '@/components/preview/education';
import { useResume } from '@/context/resume';

export default function PreviewCard() {
  const { resume } = useResume();
  return (
    <div 
      className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto dark:border-2"
      style={{ borderColor: resume?.themeColor }}
    >
      <PersonalDetails resume={resume} />
      {resume.summary ? (
        <>
          <hr className="my-2" style={{ borderColor: resume.themeColor }} />
          <Summary resume={resume} />
        </>
      ): ""}
      <Experience resume={resume} />
      <Education resume={resume} />
    </div>
  );
}