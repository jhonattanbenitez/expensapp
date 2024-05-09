import React, { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'
import ExpenseDetail from './ExpenseDetail'

export default function ExpenseList() {
    const {state} = useBudget()
    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])
  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-5">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-light">No expenses </p>
      ) : (
        <>
          <h2 className="text-green-600 text-2xl font-light my-5">
            Expense List
          </h2>
          {state.expenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
