import { type ResumeType } from '@/context/resume';

type PreviewCardProps = {
  resume: ResumeType; 
};

export default function PersonalDetails({ resume }: PreviewCardProps) {
  return (
    <>
      <h2 className="font-bold text-xl text-center uppercase">{resume.name}</h2>
      <h2 
        className="text-center text-sm font-medium" 
        style={{ color: resume.themeColor }}
      >
        {resume.job}
      </h2>
      <h2 className="text-center text-sm font-medium">{resume.address}</h2>
      <div className="flex justify-between">
        <div className="font-normal text-xs">{resume.phone}</div>
        <div className="font-normal text-xs">{resume.email}</div>
      </div>
    </>
  );
}