import { Input } from '@/components/ui/input';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { YearMonthDatePicker } from './YearMonthPicker';

interface CareerFieldsProps {
  name: string;
  formReturn: UseFormReturn;
  field: Record<'id', string>;
}

const CareerFields = ({ name, formReturn }: CareerFieldsProps) => {
  const { register } = formReturn;

  return (
    <li className="flex w-full gap-8 mb-5">
      <Input
        placeholder="회사명"
        {...register(`${name}.companyName`, {
          required: '필수 입력 항목입니다.'
        })}
      />
      <Input
        placeholder="직책"
        {...register(`${name}.role`, {
          required: '필수 입력 항목입니다.'
        })}
      />
      <Input
        placeholder="맡은 업무"
        {...register(`${name}.duty`, {
          required: '필수 입력 항목입니다.'
        })}
      />
      <YearMonthDatePicker placeholder="근무 시작 일자" name={`${name}.durationStart`} formReturn={formReturn} />
      <YearMonthDatePicker placeholder="근무 종료 일자" name={`${name}.durationEnd`} formReturn={formReturn} />
    </li>
  );
};

export default CareerFields;
