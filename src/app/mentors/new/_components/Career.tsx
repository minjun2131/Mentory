import React, { useEffect } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import CareerFields from './CareerFields';

const initialCareerFields = {
  companyName: '',
  role: '',
  durationStart: undefined,
  durationEnd: undefined,
  duty: ''
};

interface CareerProps {
  formReturn: UseFormReturn;
}

const Career = ({ formReturn }: CareerProps) => {
  const { control } = formReturn;
  const name = 'careers';
  const { fields, append } = useFieldArray({ name, control });

  useEffect(() => {
    if (fields.length === 0) append(initialCareerFields);
  }, []);

  const handleAddButtonClick = () => {
    append(initialCareerFields);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-12 self-start">멘토님의 경력을 알려주세요</h2>
      <ul className="mb-5">
        {fields.map((field, idx) => (
          <CareerFields key={field.id} name={`${name}.${idx}`} formReturn={formReturn} field={field} />
        ))}
      </ul>
      <button type="button" onClick={handleAddButtonClick} className="mb-5">
        추가하기
      </button>
    </div>
  );
};

export default Career;
