import { ComponentProps } from 'react';

export default function CkCheck({ ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M6.66649 10.115L12.7945 3.98633L13.7378 4.92899L6.66649 12.0003L2.42383 7.75766L3.36649 6.81499L6.66649 10.115Z"
        fill="white"
      />
    </svg>
  );
}
