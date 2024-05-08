import React from 'react'
import AmountDisplay from './AmountDisplay'
import { useBudget } from '../hooks/useBudget';

export default function BudgetTracker() {
  const { state, totalExpenses, budgetAvailable } = useBudget()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="expenses graph" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-red-700 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          Reset
        </button>
        <AmountDisplay label="budget" amount={state.budget} />
        <AmountDisplay label="Available" amount={budgetAvailable} />
        <AmountDisplay label="Spent" amount={totalExpenses} />
      </div>
    </div>
  );
}
