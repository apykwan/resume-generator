import { ArrowRight, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResume } from '@/context/resume';
import { useSkills, type SkillsType } from '@/context/skills';

export default function StepFive() {
  const { resume } = useResume();
  const {
    skillsList,
    handleSkillsNameChange,
    handleSkillsLevelChange,
    handleSkillsSubmit,
    addSkills,
    removeSkills
  } = useSkills();

  const skillLevels = [
    { label: "Novice", value: 1 },
    { label: "Basic", value: 2 },
    { label: "Moderate", value: 3 },
    { label: "Advanced", value: 4 },
    { label: "Proficient", value: 5 },
  ];
  console.log(skillsList)
  return (
    <section 
      className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto"
      style={{ borderColor: resume.themeColor }}
    >
      <h2
        className="text-2xl font-bold mb-5"
        style={{ color: resume.themeColor }}
      >
        Skills
      </h2>
      {skillsList?.length > 0 &&
        skillsList?.map((skill, index) => (
          <div key={`skill-${index}`} className="mb-10">
            <Input
              type="text"
              placeholder="Skill name"
              value={skill.name}
              onChange={(e) => handleSkillsNameChange(e, index)}
              className="mb-3"
              autoFocus
            />

            <div className="flex space-x-2">
              {skillLevels.map((level) => (
                <Button
                  key={level.value}
                  variant={Number(skill.level) == level.value ? "secondary" : "link"}
                  onClick={handleSkillsLevelChange.bind(null, String(level.value), index)}
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        ))}

      <div className="flex justify-between mt-3">
        <Button variant="outline" onClick={addSkills}>
          <Plus size={18} className="mr-2" /> Add
        </Button>

        {skillsList?.length > 1 && (
          <Button variant="outline" onClick={removeSkills}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )}

        <Button variant="outline" onClick={handleSkillsSubmit}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </section>
  );
}