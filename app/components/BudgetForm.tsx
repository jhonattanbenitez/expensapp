"use client";
import React, { useMemo, useState } from "react";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <=0
  }, [budget]);
  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-emerald-600 font-bold text-center"
        >
          Define Budget
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-y-gray-200 p-2"
          placeholder="Define your budget"
          name="budget"
          value={budget}
          onChange={handleChnage}
        />
      </div>
      <input
        type="submit"
        value="Define Budget"
        className="bg-emerald-600 hover:bg-emerald-800 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
        disabled={isValid}
      />
    </form>
  );
}
