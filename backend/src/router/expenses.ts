import { Router } from "express";
import {
  createGroceryExpense,
  createMonthlyExpense,
  deleteExpense,
  getAllExpenses,
  getGroceryExpensesOverTime,
  getMonthlyCostsByCategory,
} from "../controller";
import { authenticateToken } from "./../middlewares/authentication";

const router = Router();

router.post("/", authenticateToken, createGroceryExpense);

router.post("/grocery-expenses", authenticateToken, createGroceryExpense);
router.post("/monthly-expenses", authenticateToken, createMonthlyExpense);
router.post("/monthly-expenses", authenticateToken, createMonthlyExpense);
router.get(
  "/grocery-expenses-over-time",
  authenticateToken,
  getGroceryExpensesOverTime
);
router.get(
  "/monthly-costs-by-category",
  authenticateToken,
  getMonthlyCostsByCategory
);
router.delete("/:id", authenticateToken, deleteExpense);
router.get("/", authenticateToken, getAllExpenses);

export default router;
