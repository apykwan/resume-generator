import { type ResumeType } from '@/context/resume';
import { type EducationType, useEducation } from '@/context/education';

type EducationProps = {
  resume: ResumeType;
};

export default function Education({ resume }: EducationProps) {
  const { educationList } = useEducation();
  return (
    <div className="my-6">
      <h2 
          className="font-bold text-sm mb-2"
          style={{ color: resume.themeColor}}
        >
          Education
        </h2>
        <hr style={{ borderColor: resume.themeColor }} />
        {educationList.map((exp: EducationType) => (
          <div key={exp?._id} className="my-5">
            <h2 className="text-sm font-bold my-1">{exp?.qualification}</h2>
            <div className="ml-2">
              <p className="text-xs">{exp?.name}</p>
              <p className="text-xs text-gray-600">{exp?.address}</p>
              <p className="text-xs text-gray-600">{exp?.year}</p>
            </div>
          </div>
        ))}
    </div>
  );
}