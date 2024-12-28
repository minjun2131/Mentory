import { steps } from '@/utils/mentorSteps';
import React from 'react';

interface MoveActionsProps {
  currentStep: string;
  onNext: () => void;
  onPrev: () => void;
  isPending: boolean;
}

const MoveActions = ({ currentStep, onPrev, onNext, isPending }: MoveActionsProps) => {
  return (
    <div className="flex gap-10">
      {steps.hasPrev(currentStep) && (
        <button type="button" onClick={() => onPrev()}>
          이전
        </button>
      )}
      {steps.hasNext(currentStep) ? (
        <button type="button" onClick={() => onNext()}>
          다음
        </button>
      ) : (
        <button type="submit" disabled={isPending}>
          등록하기
        </button>
      )}
    </div>
  );
};

export default MoveActions;
