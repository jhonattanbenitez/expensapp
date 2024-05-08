'use client'
import { useReducer, createContext, Dispatch, ReactNode, useMemo} from "react";
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number
  budgetAvailable: number
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () =>
      state.expenses.reduce((total, exepense) => exepense.amount + total, 0),
    [state.expenses]
  );
  const budgetAvailable = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        budgetAvailable
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
