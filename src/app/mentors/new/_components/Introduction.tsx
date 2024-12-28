import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IntroductionProps {
  formReturn: UseFormReturn;
}
const Introduction = ({ formReturn }: IntroductionProps) => {
  const {
    register,
    formState: { errors }
  } = formReturn;

  const name = 'introduction';

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-12 self-start">간단한 소개를 입력해주세요.</h2>
      <Textarea
        {...register(name, {
          required: '필수 입력 항목입니다.'
        })}
      />
      {errors[name]?.message && <p>{errors[name].message as string}</p>}
    </div>
  );
};

export default Introduction;
