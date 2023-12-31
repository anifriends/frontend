export type CheckDuplicatedEmailRequestData = {
  email: string;
};

export type SigninRequestData = CheckDuplicatedEmailRequestData & {
  password: string;
};

export type ChangePasswordRequestData = {
  newPassword: string;
  oldPassword: string;
};

export type SigninResponseData = {
  accessToken: string;
  userId: number;
  role: string;
};

export type CheckDuplicatedEmailResponseData = {
  isDuplicated: boolean;
};
