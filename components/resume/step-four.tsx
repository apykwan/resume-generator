import { ArrowRight, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResume } from '@/context/resume';
import { useEducation, type EducationType } from '@/context';

export default function StepFour() {
  const { resume } = useResume();
  const { 
    educationList,
    handleEducationChange,
    handleEducationSubmit,
    addEducation,
    removeEducation,
  } = useEducation();
  return (
    <section 
      className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto"
      style={{ borderColor: resume.themeColor }}
    >
      <h2
        className="text-2xl font-bold mb-5"
        style={{ color: resume.themeColor }}
      >
        Education
      </h2>
      {educationList?.length > 0 && educationList?.map((education: EducationType, index: number) => (
        <div key={`education-${index}`} className="mb-10">
          <Input 
            className="mb-3" 
            value={education.name}
            name="name"
            placeholder="Instituion Name"
            onChange={e => handleEducationChange(e, index)}
            spellCheck={false}
            type="text"
            autoFocus 
            required 
          />
          <Input 
            className="mb-3" 
            value={education.address}
            name="address"
            placeholder="Company Address"
            onChange={e => handleEducationChange(e, index)}
            spellCheck={false}
            type="text"
          />
          <Input 
            className="mb-3" 
            value={education.qualification}
            name="qualification"
            placeholder="Degree"
            onChange={e => handleEducationChange(e, index)}
            spellCheck={false}
            type="text"
          />
          <Input 
            className="mb-3" 
            value={education.year}
            name="year"
            placeholder="Completed year"
            onChange={e => handleEducationChange(e, index)}
            spellCheck={false}
            type="text"
          />
        </div>
      ))}
      <div className="flex justify-between mt-3">
        <Button variant="outline" onClick={addEducation}>
          <Plus size={18} className="mr-2" /> Add
        </Button>

        {educationList?.length > 1 && (
          <Button variant="outline" onClick={removeEducation}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )}

        <Button variant="outline" onClick={handleEducationSubmit}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </section>
  );
}