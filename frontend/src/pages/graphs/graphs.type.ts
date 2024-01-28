export interface MonthlyExpenses {
  monthlyExpenses: MonthlyExpense[];
  totalAmount: number;
}

export interface MonthlyExpense {
  id: string;
  amount: number;
  date: Date;
  expenseType: string;
  userId: string;
  categoryId: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface DailyExpenses {
  groceryExpenses: DailyExpense[];
  totalAmount: number;
}

export interface DailyExpense {
  id: string;
  amount: number;
  date: Date;
  expenseType: string;
  userId: string;
  categoryId: null;
}
