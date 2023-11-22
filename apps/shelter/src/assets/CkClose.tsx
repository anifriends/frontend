import { ComponentProps } from 'react';

export default function CkClose({ ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      {...props}
    >
      <path
        d="M8.50048 7.05781L11.8005 3.75781L12.7431 4.70048L9.44315 8.00048L12.7431 11.3005L11.8005 12.2431L8.50048 8.94315L5.20048 12.2431L4.25781 11.3005L7.55781 8.00048L4.25781 4.70048L5.20048 3.75781L8.50048 7.05781Z"
        fill="white"
      />
    </svg>
  );
}
