import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import StepTitle from './StepTitle';

interface HashTagsProps {
  formReturn: UseFormReturn;
}

const HashTags = ({ formReturn }: HashTagsProps) => {
  const [tagName, setTagName] = useState('');
  const { getValues, control } = formReturn;
  const name = 'hashTags';
  const { fields, append } = useFieldArray({ name, control });
  const tags: string[] = getValues(name);

  const handleAddButtonClick = () => {
    append(tagName.trim());
  };

  return (
    <div className="flex flex-col items-center min-h-[425px]">
      <StepTitle>멘토님을 나타내는 태그를 입력해주세요</StepTitle>
      <div className="flex mb-10">
        <Input type="text" value={tagName} onChange={(e) => setTagName(e.target.value)} className="mr-5" />
        <button onClick={handleAddButtonClick} className="w-20 text-blue-500 bg-gray-100 rounded-md">
          추가
        </button>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-5 w-full h-48 p-5 rounded-md bg-gray-100 text-blue-500 text-2xl">
        {fields.map((field, idx) => (
          <div className="p-2 bg-white rounded-md" key={field.id}>
            {'#' + tags[idx]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashTags;
