import React, { ChangeEvent, useState, useEffect } from "react";
import InputText from "./InputText";
import { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage"
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
   const handleChange = (
     e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
   ) => {
     const { name, value } = e.target;

     const isAmountField = name === "amount";
     const newValue = isAmountField ? parseFloat(value) || 0 : value;

     setExpense((prevExpense) => ({
       ...prevExpense,
       [name]: newValue,
     }));
   };

    const handleChangeDate = (value: Value) => {
       setExpense({
        ...expense,
        date: value
       })
    }
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [fade, setFade] = useState(false)
    const {dispatch} = useBudget()

        useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
            setFade(true); // Start fading out after 2 seconds
            setTimeout(() => {
                setSuccess(null);
                setFade(false); // Reset fade to use again for the next message
            }, 1000); // After one second of fading, clear the message
            }, 2000);
            return () => clearTimeout(timer);
        }
        }, [success]);

        useEffect(() => {
          if (error) {
            const timer = setTimeout(() => {
                setFade(true); // Start fading out after 2 seconds
                setTimeout(() => {
                setError(null);
                setFade(false); // Reset fade to use again for the next message
                }, 1000); // After one second of fading, clear the message
            }, 2000);
            return () => clearTimeout(timer);
          }
        }, [error]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(expense).includes('')) {
            setError('All fields are required')
            return
        }
        // add a new expense
        dispatch({type:'add-expense', payload: {expense}})

        // Success

        setSuccess('The expense was added')

        // reset form

        setExpense({
          amount: 0,
          expenseName: "",
          category: "",
          date: new Date(),
        });
        setError(null);
    }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-light border-b-4 py-2 border-emerald-500">
        New Expense
      </legend>
      {error && <ErrorMessage fade={fade}>{error}</ErrorMessage>}
      {success && <SuccessMessage fade={fade}>{success}</SuccessMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Expense:
        </label>
        <InputText
          id="expenseName"
          name="expenseName"
          placeholder="Add expense's name"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Quantity:
        </label>
        <InputText id="amount" placeholder="add amount" name="amount" value={expense.amount} onChange={handleChange}/>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Category:
        </label>
        <select name="category" id="category" className="bg-slate-100 p-2" value={expense.category} onChange={handleChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Expense Date: 
        </label>
       <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}/>
      </div>
      <input
        type="submit"
        className="bg-emerald-600 cursor-pointer w-full p-2 text-white uppercase font-light rounded-lg mt-2"
        value={"add expense"}
      />
    </form>
  );
}