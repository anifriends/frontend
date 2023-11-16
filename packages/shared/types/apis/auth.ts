export type checkDuplicatedEmailRequestData = {
  email: string;
};

export type SigninRequestData = checkDuplicatedEmailRequestData & {
  password: string;
};

export type SigninResponseData = {
  accessToken: string;
  useId: number;
  role: string;
};

export type checkDuplicatedEmailResponseData = {
  isDuplicated: boolean;
};
