import React, { ReactNode } from 'react'

type ErrorMessageProps = {
    children: ReactNode
    fade: boolean
}

export default function ErrorMessage({children, fade}: ErrorMessageProps) {
  return (
    <p
      className={`bg-red-600 font-light p-2 text-center text-white text-sm transition-opacity duration-1000 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </p>
  );
}
