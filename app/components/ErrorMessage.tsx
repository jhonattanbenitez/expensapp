import React, { ReactNode } from 'react'

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className='bg-red-600 font-light p-2 text-center text-white text-sm'>
        {children}
    </p>
  )
}
