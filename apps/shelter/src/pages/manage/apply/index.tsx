import { Box } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { getShelterRecruitmentApplicants } from '@/apis/recruitment';
import { APPLICANT_STATUS_ENG } from '@/constants/recruitment';

import ApplyInfoItem from './_components/ApplyInfoItem';
import ApprovedCountBox from './_components/ApprovedCountBox';
import ManageApplyItem from './_components/ManageApplyItem';

function ManageApply() {
  const { id: recruitmentId } = useParams<{ id: string }>();
  const {
    data: {
      currentRecruitmentCount,
      recruitmentCapacity,
      applicants,
      approvedCount,
    },
  } = useSuspenseQuery({
    queryKey: ['recruitment', 'manage', 'apply', Number(recruitmentId)],
    queryFn: () => getShelterRecruitmentApplicants(Number(recruitmentId)),
    select: ({ data: { applicants, recruitmentCapacity } }) => {
      return {
        applicants,
        recruitmentCapacity,
        currentRecruitmentCount: applicants.length,
        approvedCount: applicants.filter(
          ({ applicantStatus }) =>
            applicantStatus === APPLICANT_STATUS_ENG.APPROVED,
        ).length,
      };
    },
  });

  return (
    <Box pb={20}>
      <ApplyInfoItem
        currentRecuritmentCount={currentRecruitmentCount}
        recruitmentCapacity={recruitmentCapacity}
      />
      {applicants.map((applicant) => (
        <ManageApplyItem
          key={applicant.applicantId}
          recruitmentId={Number(recruitmentId)}
          applicant={applicant}
        />
      ))}
      <ApprovedCountBox approvedCount={approvedCount} />
    </Box>
  );
}

export default function ManageApplyPage() {
  return (
    <Suspense fallback={<p>봉사 신청 현황 페이지 로딩 중...</p>}>
      <ManageApply />
    </Suspense>
  );
}
