export const APPLICANT_STATUS = {
  PENDING: { ENG: 'PENDING', KOR: '대기중', COLOR: 'YELLOW' },
  REFUSED: { ENG: 'REFUSED', KOR: '거절됨', COLOR: 'RED' },
  APPROVED: { ENG: 'APPROVED', KOR: '승인완료', COLOR: 'ORANGE' },
  ATTENDANCE: { ENG: 'ATTENDANCE', KOR: '출석완료', COLOR: 'GREEN' },
  NOSHOW: { ENG: 'NOSHOW', KOR: '불참', COLOR: 'RED' },
} as const;
