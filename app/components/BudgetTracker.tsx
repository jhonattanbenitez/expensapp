import React from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { categories } from "../data/categories";
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {
  const { state, totalExpenses, budgetAvailable, dispatch } = useBudget();

  // Helper to find the total spent for a given category
  const getCategoryTotal = (categoryId: string) => {
    const categoryExpense = state.categoryExpenses.find(
      (cat) => cat.categoryId === categoryId
    );
    return categoryExpense ? categoryExpense.total : 0;
  };

  // Calculate the percentage spent per category based on the budget
  const getCategoryPercentage = (categoryId: string) => {
    const categoryTotal = getCategoryTotal(categoryId);
    return state.budget > 0
      ? Math.round((categoryTotal / state.budget) * 100)
      : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="grid grid-flow-cols-2 md:grid-cols-4 gap-5">
        {categories.map((category) => {
          const categoryPercentage = getCategoryPercentage(category.id);

          return (
            <div key={category.id} className="flex flex-col items-center">
              <CircularProgressbar
                value={categoryPercentage}
                text={`${categoryPercentage}%`}
                styles={buildStyles({
                  pathColor: category.color,
                  trailColor: "#f5f5f5",
                  textColor: category.color,
                  textSize: "16px",
                })}
              />
              <span className="text-sm font-light">{category.name}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-red-700 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({type: "reset-app"})}
        >
          Reset
        </button>
        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Available" amount={budgetAvailable} />
        <AmountDisplay label="Spent" amount={totalExpenses} />
      </div>
    </div>
  );
}
