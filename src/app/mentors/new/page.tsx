'use client';

import { useFunnel } from '@/hooks/useFunnel';
import React from 'react';
import Introduction from './_components/Introduction';
import { useForm } from 'react-hook-form';
import { steps } from '@/utils/mentorSteps';
import Career from './_components/Career';
import HashTags from './_components/HashTags';
import { useRegisterMentor } from '@/hooks/useRegisterMentor';
import ProfileImage from './_components/ProfileImage';
import { uploadProfileImage } from '@/lib/upload';
import Completion from './_components/Completion';
import MoveActions from './_components/MoveActions';

const MentorRegistrationPage = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel(steps.order[0]);
  const formReturn = useForm({ mode: 'onSubmit' }); // 폼 요소가 포커스를 잃을 때마다 유효성 검사를 실행
  const { isPending, mutate } = useRegisterMentor(next);
  const {
    trigger,
  } = formReturn;

  const handleNext = async () => {
    const nextStep = steps.getNextStep(currentStep);
    if (nextStep && await trigger()) next(nextStep);
  };

  const handlePrev = () => {
    const prevStep = steps.getPrevStep(currentStep);
    if (prevStep) prev(prevStep);
  };

  const submitFormData = async () => {
    const { careers, hashTags, introduction, profileImageFile } = formReturn.getValues();
    const profileImage = await uploadProfileImage({ type: 'mentor-profile', file: profileImageFile[0] });
    mutate({ careers, hashTags, introduction, profileImage });
  };

  const onSubmit = () => {
    formReturn.handleSubmit(submitFormData)();
  };

  return (
    <div className="h-lvh mt-16">
      <form className="flex flex-col items-center">
        <Funnel>
          <Step name="introduction">
            <Introduction formReturn={formReturn} />
          </Step>
          <Step name="careers">
            <Career formReturn={formReturn} />
          </Step>
          <Step name="hashTags">
            <HashTags formReturn={formReturn} />
          </Step>
          <Step name="profileImage">
            <ProfileImage formReturn={formReturn} />
          </Step>
          <Step name="completion">
            <Completion />
          </Step>
        </Funnel>
        <MoveActions
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
          isPending={isPending}
          onSubmit={onSubmit}
        />
      </form>
    </div>
  );
};

export default MentorRegistrationPage;
