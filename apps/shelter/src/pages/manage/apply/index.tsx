import { ShelterRecruitmentApplicant } from '@/types/apis/recruitment';

import ApplyInfoItem from './_components/ApplyInfoItem';
import ApprovedCountBox from './_components/ApprovedCountBox';
import ManageApplyItem from './_components/ManageApplyItem';

const applicant: ShelterRecruitmentApplicant = {
  applicantId: 10,
  volunteerId: 1,
  volunteerName: '김영희',
  volunteerBirthDate: '1997-11-21',
  volunteerGender: 'FEMALE',
  completedVolunteerCount: 3,
  volunteerTemperature: 33,
  applicantStatus: 'APPROVED',
};

export default function ManageApplyPage() {
  return (
    <>
      <ApplyInfoItem currentRecuritmentCount={5} recruitmentCapacity={15} />
      <ManageApplyItem applicant={applicant} />
      <ManageApplyItem applicant={applicant} />
      <ManageApplyItem applicant={applicant} />
      <ManageApplyItem applicant={applicant} />
      <ManageApplyItem applicant={applicant} />
      <ManageApplyItem applicant={applicant} />
      <ManageApplyItem applicant={applicant} />
      <ManageApplyItem applicant={applicant} />
      <ApprovedCountBox approvedCount={4} />
    </>
  );
}
