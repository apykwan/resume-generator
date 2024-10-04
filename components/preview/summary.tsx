import DOMPurify from 'dompurify';

import { type ResumeType } from '@/context';

type SummaryProps = {
  resume: ResumeType; 
};

export default function Summary({ resume }: SummaryProps) {
  let summary = DOMPurify.sanitize(resume?.summary as string);
  return (
    <>
      {resume.summary && (
        <div className="mt-5">
          <h2 
            className="text-sm font-bold mb-3"
            style={{ color: resume.themeColor }}
          >
            Objective
          </h2>
          <article 
            className="text-xs font-normal my-3"
            dangerouslySetInnerHTML={{ __html: summary }}
          >
          </article>
        </div>
      )}
    </>
  );
}