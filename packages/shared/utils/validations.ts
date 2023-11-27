import * as z from 'zod';

import { createFormattedTime } from './date';

export const email = z
  .string()
  .min(1, '이메일은 필수 정보입니다')
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    '이메일 형식이 올바르지 않습니다',
  );
export const isEmailDuplicated = z.boolean();
export const password = z.string().min(1, '비밀번호 정보는 필수입니다');
// TODO 나중에 추가 예정
//
// .regex(
//   /^(?=.*[!@#$%^&*()\-_=+[\]\\|{};:'",<.>/?]+)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
//   '비밀번호는 필수 정보입니다(8자 이상)',
// ),
export const passwordConfirm = z
  .string()
  .min(1, '비밀번호 확인 정보는 필수입니다');
export const oldPassword = z.string().min(1, '기본 비밀번호 정보는 필수입니다');
export const newPassword = z.string().min(1, '변경 비밀번호 정보는 필수입니다');
// TODO 나중에 추가 예정
//
// .regex(
//   /^(?=.*[!@#$%^&*()\-_=+[\]\\|{};:'",<.>/?]+)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
//   '비밀번호는 필수 정보입니다(8자 이상)',
// ),
export const newPasswordConfirm = z
  .string()
  .min(1, '변경 비밀번호 확인 정보는 필수입니다');
export const name = z.string().min(1, '보호소 이름 정보는 필수입니다');
export const address = z.string().min(1, '보호소 주소 정보는 필수입니다');
export const addressDetail = z
  .string()
  .min(1, '보호소 상세주소 정보는 필수입니다');
export const isOpenedAddress = z.boolean();
export const phoneNumber = z
  .string()
  .min(1, '보호소 전화번호 정보는 필수입니다')
  .regex(/^\d{2,3}\d{3,4}\d{4}$/, '전화번호 형식이 올바르지 않습니다');
export const sparePhoneNumber = z.union([
  z.literal(''),
  z
    .string()
    .regex(/^\d{2,3}\d{3,4}\d{4}$/, '전화번호 형식이 올바르지 않습니다'),
]);
export const gender = z.enum(['FEMALE', 'MALE']);
export const birthDate = z
  .string()
  .min(1, '생년월일 정보는 필수입니다')
  .refine(
    (val) => new Date(val) < new Date(),
    `${createFormattedTime(new Date())} 이전으로 선택해주세요`,
  );
