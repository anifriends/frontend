import { createFormattedTime, getDDay } from 'shared/utils/date';

import { Recruitment } from '@/types/apis/recruitment';

export const createRecruitmentItem = (recruitment: Recruitment) => {
  const {
    recruitmentId,
    recruitmentTitle,
    shelterName,
    shelterImageUrl,
    recruitmentApplicantCount,
    recruitmentCapacity,
    recruitmentStartTime,
    recruitmentDeadline,
    recruitmentIsClosed,
  } = recruitment;

  return {
    id: recruitmentId,
    title: recruitmentTitle,
    shelterName: shelterName,
    shelterProfileImage: shelterImageUrl,
    isRecruitmentClosed: recruitmentIsClosed,
    volunteerDate: createFormattedTime(
      new Date(recruitmentStartTime),
      'YY.MM.DD',
    ),
    volunteerDateDday: getDDay(recruitmentDeadline),
    applicantCount: recruitmentApplicantCount,
    recruitmentCapacity: recruitmentCapacity,
  };
};
