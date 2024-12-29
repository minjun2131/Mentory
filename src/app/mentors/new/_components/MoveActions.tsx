import { steps } from '@/utils/mentorSteps';
import React from 'react';

interface MoveActionsProps {
  currentStep: string;
  onNext: () => void;
  onPrev: () => void;
  isPending: boolean;
  onSubmit: () => void;
}

const MoveActions = ({ currentStep, onPrev, onNext, isPending, onSubmit }: MoveActionsProps) => {
  return (
    <div className="flex gap-10">
      {steps.hasPrev(currentStep) && (
        <button
          type="button"
          onClick={() => onPrev()}
          className="bg-main hover:bg-main-hover text-white py-2 px-8 min-w-[100px] rounded mx-auto block transition-all"
        >
          이전
        </button>
      )}
      {steps.hasNext(currentStep) ? (
        <button
          type="button"
          onClick={() => {
            onNext();
          }}
          className="bg-main hover:bg-main-hover text-white py-2 px-8 min-w-[100px] rounded mx-auto block transition-all"
        >
          다음
        </button>
      ) : (
        <button
          type="button"
          disabled={isPending}
          onClick={onSubmit}
          className="bg-main hover:bg-main-hover text-white py-2 px-8 min-w-[100px] rounded mx-auto block transition-all"
        >
          등록하기
        </button>
      )}
    </div>
  );
};

export default MoveActions;
