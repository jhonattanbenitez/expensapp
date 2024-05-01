"use client";

import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpensesModal";
import ExpenseList from "./components/ExpenseList";

export default function Home() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);
  return (
    <>
      <header className="bg-emerald-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Expenses Planner
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}
