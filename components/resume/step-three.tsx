import dynamic from 'next/dynamic';
import { ArrowRight, Plus, X, Loader2Icon, Brain } from 'lucide-react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResume } from '@/context/resume';
import { useExperience } from '@/context/experience';

export default function StepThree() {
  const { resume } = useResume();
  const {
    experienceList,
    experienceLoading,
    handleExperienceChange,
    handleExperienceQuillChange,
    handleExperienceSubmit,
    addExperience,
    removeExperience,
    handleExperienceGenerateWithAi
  } = useExperience();
  console.log(experienceList);
  return (
    <section 
      className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto"
      style={{ borderColor: resume.themeColor }}
    >
      <h2
        className="text-2xl font-bold mb-5"
        style={{ color: resume.themeColor }}
      >
        Experience
      </h2>
      {experienceList?.length > 0 && experienceList?.map((experience, index) => (
        <div key={`experience-${index}`} className="mb-10">
          <Input 
            className="mb-3" 
            value={experience.title}
            name="title"
            placeholder="Job Title"
            onChange={e => handleExperienceChange(e, index)}
            spellCheck={false}
            type="text"
            autoFocus 
            required 
          />
          <Input 
            className="mb-3" 
            value={experience.company}
            name="company"
            placeholder="Company Name"
            onChange={e => handleExperienceChange(e, index)}
            spellCheck={false}
            type="text"
            autoFocus 
            required 
          />
          <Input 
            className="mb-3" 
            value={experience.address}
            name="address"
            placeholder="Company Address"
            onChange={e => handleExperienceChange(e, index)}
            spellCheck={false}
            type="text"
          />
          <Input 
            className="mb-3" 
            value={experience.startDate}
            name="startDate"
            placeholder="Start Date"
            onChange={e => handleExperienceChange(e, index)}
            spellCheck={false}
            type="text"
          />
          <Input 
            className="mb-3" 
            value={experience.endDate}
            name="endDate"
            placeholder="End Date"
            onChange={e => handleExperienceChange(e, index)}
            spellCheck={false}
            type="text"
          />
          
          <ReactQuill 
            theme="snow" 
            onChange={value => handleExperienceQuillChange(value, index)} 
            value={experience.summary}
            className="mb-2"
            placeholder="Job Summary"
          />

          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={handleExperienceGenerateWithAi.bind(null, index)}
              disabled={experienceLoading[index]}
            >
              {experienceLoading[index] ? (
                <Loader2Icon size={18} className="mr-2 animate-spin" />
              ) : (
                <Brain size={18} className="mr-2" />
              )}
              Generate with AI
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-3">
        <Button variant="outline" onClick={addExperience}>
          <Plus size={18} className="mr-2" /> Add
        </Button>

        {experienceList?.length > 1 && (
          <Button variant="outline" onClick={removeExperience}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )}

        <Button variant="outline" onClick={handleExperienceSubmit}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </section>
  );
}