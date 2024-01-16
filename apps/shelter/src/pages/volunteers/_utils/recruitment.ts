import { createFormattedTime, getDDay } from '@anifriends/utils';

import { Recruitment } from '@/types/apis/recruitment';

export const createRecruitmentItem = (recruitment: Recruitment) => {
  const {
    recruitmentId,
    recruitmentTitle,
    recruitmentStartTime,
    recruitmentEndTime,
    recruitmentDeadline,
    recruitmentIsClosed,
    recruitmentApplicantCount,
    recruitmentCapacity,
  } = recruitment;

  const recruitmentStartDate = new Date(recruitmentStartTime);
  const recruitmentEndDate = new Date(recruitmentEndTime);
  const recruitmentDeadlineDate = new Date(recruitmentDeadline);

  return {
    id: recruitmentId,
    title: recruitmentTitle,
    isRecruitmentClosed: recruitmentIsClosed,
    volunteerDate: createFormattedTime(recruitmentStartDate, 'YYYY.MM.DD'),
    volunteerTime: `${createFormattedTime(
      recruitmentStartDate,
      'hh:mm',
    )}~${createFormattedTime(recruitmentEndDate, 'hh:mm')}`,
    deadLineDate: createFormattedTime(recruitmentDeadlineDate, 'YYYY.MM.DD'),
    deadLineTime: createFormattedTime(recruitmentDeadlineDate, 'hh:mm'),
    volunteerDateDday: getDDay(recruitmentDeadline),
    applicantCount: recruitmentApplicantCount,
    recruitmentCapacity: recruitmentCapacity,
  };
};
