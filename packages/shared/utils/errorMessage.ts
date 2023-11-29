export const getErrorMessage = (status: number) => {
  switch (status) {
    case 401:
      return {
        title: '로그인이 필요한 서비스입니다',
        content: '로그인을 해주세요',
      };
    case 403:
      return {
        title: '접근 권한이 없습니다',
        content: '홈으로 이동해주세요',
      };
    case 409:
    case 500:
    default:
      return {
        title: '잠시 연결이 늦어지고 있습니다',
        content: '다시 한번 시도해 주세요',
      };
  }
};
