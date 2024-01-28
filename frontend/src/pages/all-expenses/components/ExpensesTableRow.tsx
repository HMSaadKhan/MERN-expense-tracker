import { TableCell, TableRow } from "@mui/material";
import { Expenses } from "../expenses.type";
import { FC } from "react";
import dayjs from "dayjs";
import { Delete } from "@mui/icons-material";
import { deleteExpense } from "../../../common/urlRoutes";
import { useAppContext } from "../../../context/AppContext";
import api from "../../../common/api";

interface ExpensesTableRowI {
  expense: Expenses;
  getAllExpenseFunc: () => Promise<void>;
}
const ExpensesTableRow: FC<ExpensesTableRowI> = ({
  expense,
  getAllExpenseFunc,
}) => {
  const { updateAppState } = useAppContext();

  const deleteSingleExpense = async () => {
    updateAppState({ loading: true });
    const res = await api.delete(deleteExpense + expense.id);
    if (res.status === 200) {
      getAllExpenseFunc();
    }
    updateAppState({ loading: false });
  };

  return (
    <TableRow>
      <TableCell>{expense.name ? expense.name : "-"}</TableCell>
      <TableCell>{expense.amount} &euro;</TableCell>
      <TableCell>{dayjs(expense.date).format("MM/DD/YYYY")}</TableCell>
      <TableCell>
        {expense.expenseType === "SIMPLE" ? "One-Time" : "Monthly"}
      </TableCell>
      <TableCell>{expense.category ? expense.category.name : "-"}</TableCell>
      <TableCell>
        <Delete className="cursor-pointer" onClick={deleteSingleExpense} />
      </TableCell>
    </TableRow>
  );
};

export default ExpensesTableRow;
