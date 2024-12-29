import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import StepTitle from './StepTitle';
import ErrorMessage from '@/components/ErrorMessage';

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
    <div className="flex flex-col items-center h-[425px]">
      <StepTitle>간단한 소개를 입력해주세요</StepTitle>
      <Textarea
        className="h-[250px] mb-5"
        {...register(name, {
          required: '필수 입력 항목입니다.'
        })}
      />
      <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
    </div>
  );
};

export default Introduction;
