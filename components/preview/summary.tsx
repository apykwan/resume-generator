import { type ResumeType } from '@/context/resume';
import DOMPurify from 'dompurify';

type SummaryProps = {
  resume: ResumeType; 
};

export default function Summary({ resume }: SummaryProps) {
  let briefSummary = '';
  if (resume.summary) {
    briefSummary = resume.summary 
    ?  DOMPurify.sanitize(resume.summary?.substring(0, 100) + '...')
    : '';
  }
  return (
    <>
      {resume.summary && (
        <div className="mt-5">
          <h2 
            className="font-bold mb-3"
            style={{ color: resume.themeColor }}
          >
            Summary
          </h2>
          <article 
            className="text-xs font-normal my-3"
            dangerouslySetInnerHTML={{ __html: briefSummary }}
          >
          </article>
        </div>
      )}
    </>
  );
}