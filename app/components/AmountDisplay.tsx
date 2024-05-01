import React from 'react'
import { formatCurrency } from '../helpers'

type AmountDisplayProps = {
    label?: string,
    amount: number
}

export default function AmountDisplay({label, amount}: AmountDisplayProps) {
  return (
    <p className='text-2xl text-emerald-600 font-bold'>
        {label && `${label}: `}
        <span className='font-light text-emerald-800'>{formatCurrency(amount)}</span>
    </p>
  )
}
