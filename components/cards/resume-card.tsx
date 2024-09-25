import { type ResumeType } from '@/context/resume';

type ResumeCardProps = {
  resume: ResumeType; 
};

export default function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <div 
      className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
      style={{ borderColor: resume?.themeColor }}
    >
      <ul>
        <li>Personal Details</li>
        <li>Summary</li>
        <li>Expereince</li>
        <li>Education</li>
        <li>Skills</li>
      </ul>
    </div>
  );
}