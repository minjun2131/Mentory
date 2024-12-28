import { steps } from '@/utils/mentorSteps';
import React from 'react';

interface MoveActionsProps {
  name: string;
  onNext: () => void;
  onPrev: () => void;
}

const MoveActions = ({ name, onPrev, onNext }: MoveActionsProps) => {
  return (
    <div className="flex gap-10">
      {steps.hasPrev(name) && (
        <button type="button" onClick={() => onPrev()}>
          이전
        </button>
      )}
      {steps.hasNext(name) ? (
        <button type="button" onClick={() => onNext()}>
          다음
        </button>
      ) : (
        <button type="submit">등록하기</button>
      )}
    </div>
  );
};

export default MoveActions;
