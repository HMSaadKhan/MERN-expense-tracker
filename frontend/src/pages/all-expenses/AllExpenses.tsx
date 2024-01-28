import ExpensesTable from "./components/ExpensesTable";
import { getAllExpense } from "./../../common/urlRoutes";
import { useEffect, useState } from "react";
import { Expenses } from "./expenses.type";
import api from "../../common/api";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddExpenses from "../../components/add-expenses/AddExpenses";

const AllExpenses = () => {
  const [allExpenses, setAllExpenses] = useState<Expenses[]>([]);
  const [addExpense, setAddExpense] = useState(false);

  const getAllExpenseFunc = async () => {
    const res = await api.get(getAllExpense);
    if (res.status === 200) {
      setAllExpenses(res.data);
    }
  };

  useEffect(() => {
    getAllExpenseFunc();
  }, []);
  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16, // Default position at the bottom
          right: "1%",
          color: "white",

          "@media (max-width: 768px)": {
            position: "fixed",
            top: "40px", // Position at the top on mobile view
            right: "2%",
          },
        }}
        onClick={() => {
          setAddExpense(true);
        }}
      >
        <AddIcon />
      </Fab>
      <ExpensesTable
        allExpenses={allExpenses}
        getAllExpenseFunc={getAllExpenseFunc}
      />
      {addExpense && (
        <AddExpenses
          getAllExpenseFunc={getAllExpenseFunc}
          open={addExpense}
          handleClose={() => {
            setAddExpense(false);
          }}
        />
      )}
    </div>
  );
};

export default AllExpenses;
