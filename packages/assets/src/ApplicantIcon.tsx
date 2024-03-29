import { ComponentProps } from 'react';

export function ApplicantIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2689_1551)">
        <path
          d="M8.00008 7.99935C9.47341 7.99935 10.6667 6.80602 10.6667 5.33268C10.6667 3.85935 9.47341 2.66602 8.00008 2.66602C6.52675 2.66602 5.33341 3.85935 5.33341 5.33268C5.33341 6.80602 6.52675 7.99935 8.00008 7.99935ZM8.00008 9.33268C6.22008 9.33268 2.66675 10.226 2.66675 11.9993V13.3327H13.3334V11.9993C13.3334 10.226 9.78008 9.33268 8.00008 9.33268Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_2689_1551">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
