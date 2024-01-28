import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { FC } from "react";
import { expenseHeading } from "./data";
import { Expenses } from "../expenses.type";
import ExpensesTableRow from "./ExpensesTableRow";

interface ExpensesTableI {
  allExpenses: Expenses[];
  getAllExpenseFunc: () => Promise<void>;
}

const ExpensesTable: FC<ExpensesTableI> = ({
  allExpenses,
  getAllExpenseFunc,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ "&:hover": { background: "none" } }}>
            {expenseHeading.map((heading, index) => {
              return (
                <TableCell sx={{ fontWeight: "bold" }} key={index}>
                  {heading}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!allExpenses.length &&
            allExpenses.map((expense) => {
              return (
                <ExpensesTableRow
                  expense={expense}
                  key={expense.id}
                  getAllExpenseFunc={getAllExpenseFunc}
                />
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesTable;
