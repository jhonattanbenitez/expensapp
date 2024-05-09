import { DraftExpense, Expense, CategoryExpense, Category } from "../types";
import { v4 as uuidv4 } from "uuid";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "udpdate-expense"; payload: { expense: Expense } }
  | { type: "reset-app"; }
  | { type: "add-filter-category"; payload: {id: Category['id']} }

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  categoryExpenses: CategoryExpense[];
  currentCategory: Category['id']
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

const loadCategoryExpensesFromLocalStorage = (): CategoryExpense[] => {
  const storedCategoryExpenses = localStorage.getItem("categoryExpenses");
  return storedCategoryExpenses ? JSON.parse(storedCategoryExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  categoryExpenses: loadCategoryExpensesFromLocalStorage(),
  currentCategory: ''
};
const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);

    // Find or create the category expense entry
    const categoryExpenses = state.categoryExpenses.map((catExp) => {
      if (catExp.categoryId === expense.category) {
        return { ...catExp, total: catExp.total + expense.amount };
      }
      return catExp;
    });

    // Add a new category expense if the category doesn't already exist
    const updatedCategoryExpenses = categoryExpenses.some(
      (catExp) => catExp.categoryId === expense.category
    )
      ? categoryExpenses
      : [
          ...categoryExpenses,
          { categoryId: expense.category, total: expense.amount },
        ];

    return {
      ...state,
      expenses: [...state.expenses, expense],
      categoryExpenses: updatedCategoryExpenses,
    };
  }
  if (action.type === "remove-expense") {
    const expenseToRemove = state.expenses.find(
      (expense) => expense.id === action.payload.id
    );

    // Adjust cumulative sums for the category of the expense being removed
    const updatedCategoryExpenses = state.categoryExpenses.map((catExp) => {
      if (expenseToRemove && catExp.categoryId === expenseToRemove.category) {
        return { ...catExp, total: catExp.total - expenseToRemove.amount };
      }
      return catExp;
    });

    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
      categoryExpenses: updatedCategoryExpenses,
    };
  }
  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "udpdate-expense") {
    const updatedExpense = action.payload.expense;
    const existingExpense = state.expenses.find(
      (expense) => expense.id === updatedExpense.id
    );

    if (!existingExpense) {
      return state; // No matching expense found, so no update is necessary
    }

    let updatedCategoryExpenses = state.categoryExpenses.map((catExp) => {
      // If the category is the same as before, adjust by subtracting old amount and adding new amount
      if (catExp.categoryId === existingExpense.category) {
        // If the expense is still in the same category
        if (existingExpense.category === updatedExpense.category) {
          return {
            ...catExp,
            total:
              catExp.total - existingExpense.amount + updatedExpense.amount,
          };
        } else {
          // If the category changes, subtract the old amount only
          return { ...catExp, total: catExp.total - existingExpense.amount };
        }
      }

      // If it's the new category, add the new amount
      if (catExp.categoryId === updatedExpense.category) {
        return { ...catExp, total: catExp.total + updatedExpense.amount };
      }

      // Unrelated categories remain unchanged
      return catExp;
    });

    // Add a new entry if the new category doesn't already exist in `categoryExpenses`
    if (
      !updatedCategoryExpenses.some(
        (catExp) => catExp.categoryId === updatedExpense.category
      )
    ) {
      updatedCategoryExpenses = [
        ...updatedCategoryExpenses,
        { categoryId: updatedExpense.category, total: updatedExpense.amount },
      ];
    }

    // Update the main state with the new expense and adjusted category expenses
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      ),
      categoryExpenses: updatedCategoryExpenses,
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "reset-app") {
    return {
      ...state,
      budget: 0,
      expenses: [],
      categoryExpenses: [],
    };
  }

  if (action.type === "add-filter-category") {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }

  return state;
};
