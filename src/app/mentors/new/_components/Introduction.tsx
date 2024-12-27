import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import MoveActions from './MoveActions';

interface IntroductionProps {
  onNext: () => void;
  onPrev: () => void;
  formReturn: UseFormReturn;
}
const Introduction = ({ onNext, onPrev, formReturn }: IntroductionProps) => {
  const {
    register,
    formState: { errors }
  } = formReturn;

  const name = 'introduction';

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold">간단한 소개를 입력해주세요.</h2>
      <Textarea
        {...register(name, {
          required: '필수 입력 항목입니다.'
        })}
      />
      {errors[name]?.message && <p>{errors[name].message as string}</p>}
      <MoveActions onNext={onNext} onPrev={onPrev} name={name} />
    </div>
  );
};

export default Introduction;