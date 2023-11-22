import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getShelterRecruitmentApplicants } from '@/apis/recruitment';
import { APPLICANT_STATUS_ENG } from '@/constants/recruitment';

import ApplyInfoItem from './_components/ApplyInfoItem';
import ApprovedCountBox from './_components/ApprovedCountBox';
import ManageApplyItem from './_components/ManageApplyItem';

export default function ManageApplyPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['recruitment', 'manage', 'apply', id],
    queryFn: () => getShelterRecruitmentApplicants(Number(id)),
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
        currentRecuritmentCount={data?.currentRecruitmentCount ?? 0}
        recruitmentCapacity={data?.recruitmentCapacity ?? 0}
      />
      {data?.applicants.map((applicant) => (
        <ManageApplyItem key={applicant.applicantId} applicant={applicant} />
      ))}
      <ApprovedCountBox approvedCount={data?.approvedCount ?? 0} />
    </Box>
  );
}
