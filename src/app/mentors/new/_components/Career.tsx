import React, { useEffect } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import CareerFields from './CareerFields';
import StepTitle from './StepTitle';

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
    <div className="flex flex-col items-center h-[425px]">
      <StepTitle>멘토님의 경력을 알려주세요</StepTitle>
      <ul className="mb-5">
        {fields.map((field, idx) => (
          <CareerFields key={field.id} name={`${name}.${idx}`} formReturn={formReturn} field={field} />
        ))}
      </ul>
      {fields.length < 5 && (
        <button
          type="button"
          onClick={handleAddButtonClick}
          className="mb-5 w-full bg-gray-100 rounded-md font-extrabold"
        >
          +
        </button>
      )}
    </div>
  );
};

export default Career;
