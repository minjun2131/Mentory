import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import MoveActions from './MoveActions';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

interface HashTagsProps {
  onNext: () => void;
  onPrev: () => void;
  formReturn: UseFormReturn;
}

const HashTags = ({ onNext, onPrev, formReturn }: HashTagsProps) => {
  const [tagName, setTagName] = useState('');
  const { getValues, control } = formReturn;
  const name = 'hashTags';
  const { fields, append } = useFieldArray({ name, control });
  const tags: string[] = getValues(name);

  const handleAddButtonClick = () => {
    append(tagName.trim());
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-12 self-start">멘토님을 나타내는 태그를 입력해주세요.</h2>
      <div className="flex">
        <div>
          <Input value={tagName} onChange={(e) => setTagName(e.target.value)} />
        </div>
        <button onClick={handleAddButtonClick}>추가</button>
      </div>
      <div className='flex gap-5'>
        {fields.map((field, idx) => (
          <div key={field.id}>{'#' + tags[idx]}</div>
        ))}
      </div>
      <MoveActions onNext={onNext} onPrev={onPrev} name={name} />
    </div>
  );
};

export default HashTags;
