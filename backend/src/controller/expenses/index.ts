import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createGroceryExpense = async (req: any, res: Response) => {
  try {
    const { date, amount, name } = req.body;
    const userId = req.user.userId;
    const newAmount = parseFloat(amount);

    const expense = await prisma.expense.create({
      data: {
        date,
        name,
        amount: newAmount,
        expenseType: "SIMPLE",
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const createMonthlyExpense = async (req: any, res: Response) => {
  try {
    const { amount, date, categoryId, name } = req.body;
    const newAmount = parseFloat(amount);
    const userId = req.user.userId;

    const monthlyExpense = await prisma.expense.create({
      data: {
        amount: newAmount,
        date,
        name,
        expenseType: "MONTHLY",
        user: {
          connect: {
            id: userId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    res.status(200).json(monthlyExpense);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGroceryExpensesOverTime = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const groceryExpenses = await prisma.expense.findMany({
      where: {
        userId,
        expenseType: "SIMPLE",
      },
      orderBy: {
        date: "asc",
      },
    });

    const totalAmount = groceryExpenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);

    res.status(200).json({ groceryExpenses, totalAmount });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMonthlyCostsByCategory = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const monthlyExpenses = await prisma.expense.findMany({
      where: {
        userId,
        expenseType: "MONTHLY",
      },
      include: {
        category: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    const totalAmount = monthlyExpenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);

    res.status(200).json({ monthlyExpenses, totalAmount });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteExpense = async (req: any, res: Response) => {
  try {
    const expenseId = req.params.id;
    const existingExpense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
    });

    if (!existingExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllExpenses = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createGroceryExpense,
  createMonthlyExpense,
  getGroceryExpensesOverTime,
  getMonthlyCostsByCategory,
  deleteExpense,
  getAllExpenses,
};
