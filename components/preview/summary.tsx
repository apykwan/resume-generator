import { type ResumeType } from '@/context/resume';

type SummaryProps = {
  resume: ResumeType; 
};

export default function Summary({ resume }: SummaryProps) {
  const briefSummary = resume.summary 
    ? resume.summary?.substring(0, 70) + '...'
    : '';
  return (
    <p className="text-xs text-slate-500 my-3">{briefSummary}</p>
  );
}