'use client';

import { useFunnel } from '@/hooks/useFunnel';
import React from 'react';
import Introduction from './_components/Introduction';
import { useForm } from 'react-hook-form';
import { steps } from '@/utils/mentorSteps';
import Career from './_components/Career';

const MentorRegistrationPage = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel(steps.order[0]);
  const formReturn = useForm({ mode: 'onBlur' }); // 폼 요소가 포커스를 잃을 때마다 유효성 검사를 실행

  const handleNext = () => {
    const nextStep = steps.getNextStep(currentStep);
    if (nextStep && formReturn.formState.isValid) next(nextStep);
  };

  const handlePrev = () => {
    const prevStep = steps.getPrevStep(currentStep);
    if (prevStep) prev(prevStep);
  };

  return (
    <div className="flex flex-col items-center h-lvh mt-16">
      <div>
        <form onSubmit={formReturn.handleSubmit(() => {})}>
          <Funnel>
            <Step name="introduction">
              <Introduction onNext={handleNext} onPrev={handlePrev} formReturn={formReturn} />
            </Step>
            <Step name="careers">
              <Career onNext={handleNext} onPrev={handlePrev} formReturn={formReturn} />
            </Step>
          </Funnel>
        </form>
      </div>
    </div>
  );
};

export default MentorRegistrationPage;
