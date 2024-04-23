import BudgetForm from "./components/BudgetForm";
import { BudgetProvider } from "./context/BudgetContext";

export default function Home() {
  return (
    <>
      <header className="bg-emerald-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Expenses Planner</h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <BudgetProvider>
          <BudgetForm />
        </BudgetProvider>
      </div>
    </>
  );
}
