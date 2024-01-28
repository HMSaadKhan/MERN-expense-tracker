export interface Expenses {
  id: string;
  amount: number;
  date: Date;
  name?: string;
  expenseType: string;
  userId: string;
  categoryId: null | string;
  category: Category | null;
}

export interface Category {
  id: string;
  name: string;
}
