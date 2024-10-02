import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

import { type ResumeType } from '@/context/resume';
import { type ExperienceType } from '@/context/experience';

type ExperienceProps = {
  resume: ResumeType;
}

export default function Experience({ resume }: ExperienceProps) {
  return (
    <div className="my-6">
      <h2 
        className="text-center font-bold text-sm mb-2"
        style={{ color: resume.themeColor}}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resume.themeColor }} />

      {resume?.experience?.map((exp: ExperienceType) => (
        <div key={exp?._id} className="my-5">
          <h2 className="text-sm font-bold my-1">{exp?.title}</h2>
          <h2 className="text-sm font-bold text-gray-700">{exp?.company}</h2>
          <p className="text-xs text-gray-500">{exp?.address}</p>
          {exp?.summary && (
            <ReactQuill
              readOnly={true}
              value={exp.summary}
              theme="bubble"
              className="text-sm font-normal"
            />
          )}
        </div>
      ))}
    </div>
  );
}