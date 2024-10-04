import { Star } from 'lucide-react';

import { Progress } from "@/components/ui/progress";
import { type ResumeType } from '@/context/resume';
import { useSkills } from '@/context';

type SkillsProps = {
  resume: ResumeType;
  print: boolean;
}

export default function Skills({ resume, print = false }: SkillsProps) {
  const defaultColor = "#d3d3d3";
  const { skillsList } = useSkills();

  return (
    <div className="my-6">
      <h2 
        className="font-bold text-sm mb-2"
        style={{ color: resume.themeColor}}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resume.themeColor }} />

      <div className="grid grid-cols-2 gap-3 my-4">
        {skillsList.map((skill, index) => {
          return (
            <div key={index} className="flex items-center justify-between">
              <h2 className="text-sm font-bold">{skill?.name}</h2>

              <div className="flex-1 ml-2">
                {print ? (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={`progress-bar-${index}`}
                        className="w-5 h-5"
                        style={{
                          color: index < Number(skill.level) 
                            ? resume.themeColor 
                            : defaultColor
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Progress value={Number(skill.level) * 20} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}