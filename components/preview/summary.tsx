'use client';

import DOMPurify from "isomorphic-dompurify";

import { type ResumeType } from '@/context';

type SummaryProps = {
  resume: ResumeType; 
};

export default function Summary({ resume }: SummaryProps) {
  const summary = DOMPurify.sanitize(resume?.summary || '');
  return (
    <>
      {resume.summary && (
        <section className="mt-5">
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
        </section>
      )}
    </>
  );
}