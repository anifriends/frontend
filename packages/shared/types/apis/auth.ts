export type checkDuplicatedEmailParams = {
  email: string;
};

export type SigninParams = checkDuplicatedEmailParams & {
  password: string;
};

export type SigninResponse = {
  accessToken: string;
  useId: number;
  role: string;
};

export type checkDuplicatedEmailResponse = {
  isDuplicated: boolean;
};
