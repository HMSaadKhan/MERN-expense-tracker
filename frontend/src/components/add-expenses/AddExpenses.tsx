import {
  Box,
  Typography,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import CustomDatePicker from "../date-picker/CustomDatePicker";
import { Dayjs } from "dayjs";
import {
  createDayExpense,
  createMonthlyExpense,
  getCategories,
} from "../../common/urlRoutes";
import api from "../../common/api";

interface AddExpensesI {
  open: boolean;
  handleClose: () => void;
  getAllExpenseFunc: () => Promise<void>;
}
export interface CategoriesI {
  id: string;
  name: string;
}

const AddExpenses: FC<AddExpensesI> = ({
  open,
  handleClose,
  getAllExpenseFunc,
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [categories, setCategories] = useState<CategoriesI[]>([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("0");
  const [name, setName] = useState("");
  const [expenseType, setExpenseType] = useState("One-Time");

  const getCategoriesData = async () => {
    const res = await api.get(getCategories);
    setCategories(res.data);
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  const addExpense = async () => {
    let res;

    if (expenseType === "One-Time") {
      res = await api.post(createDayExpense, {
        amount,
        name,
        date: date?.toISOString(),
      });
    } else {
      res = await api.post(createMonthlyExpense, {
        amount,
        name,
        date: new Date().toISOString(),
        categoryId: category,
      });
    }

    if (res.status === 200) {
      handleClose();
      getAllExpenseFunc();
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="p-10">
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          className="text-center"
        >
          Add Expense
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Choose Expense Type
            </FormLabel>
            <RadioGroup
              row
              value={expenseType}
              onChange={(e) => {
                setExpenseType(e.target.value);
              }}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="One-Time"
                control={<Radio />}
                label="One-time"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio />}
                label="Monthly"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className="my-3">
          <TextField
            fullWidth
            placeholder="Expense Name"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Box>
        {expenseType === "One-Time" ? (
          <Box mt={2} sx={{ width: "100%" }}>
            <CustomDatePicker
              placeholder="Expense Date"
              date={date}
              onChange={(value) => {
                setDate(value as Dayjs);
              }}
              onClear={() => {
                setDate(null);
              }}
            />
          </Box>
        ) : (
          <Box className="my-3">
            <Box mt={2} sx={{ width: "100%" }}>
              <CustomDatePicker
                placeholder="Expense Date"
                date={date}
                onChange={(value) => {
                  setDate(value as Dayjs);
                }}
                onClear={() => {
                  setDate(null);
                }}
                isMonth
              />
            </Box>
            <Box className="my-3">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {categories.map((cat) => {
                    return (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
        )}
        <Box className="my-3">
          <TextField
            fullWidth
            placeholder="Enter Amount"
            size="small"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </Box>
        <Box className="flex my-3 justify-end">
          <Box className="mx-3">
            <Button variant="contained" onClick={addExpense}>
              Add
            </Button>
          </Box>
          <Button variant="contained" className="mx-3" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddExpenses;
