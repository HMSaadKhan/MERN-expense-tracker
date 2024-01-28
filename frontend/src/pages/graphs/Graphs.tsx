/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import api from "../../common/api";
import { getMonthlyExpense, getDayExpense } from "../../common/urlRoutes";
import { DailyExpenses, MonthlyExpenses } from "./graphs.type";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./graphs.css"

const darkColors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
const Graphs = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyExpenses>();
  const [dailyData, setDailyData] = useState<DailyExpenses>();

  const getMonthlyData = async () => {
    const res = await api.get(getMonthlyExpense);
    if (res.status === 200) {
      setMonthlyData(res.data);
    }
  };
  const getDailyData = async () => {
    const res = await api.get(getDayExpense);
    if (res.status === 200) {
      setDailyData(res.data);
    }
  };

  useEffect(() => {
    getMonthlyData();
    getDailyData();
  }, []);

  const categories: any = {};
  monthlyData?.monthlyExpenses.forEach((expense) => {
    const categoryName = expense.category.name;
    const amount = expense.amount;

    if (categories[categoryName]) {
      categories[categoryName] += amount;
    } else {
      categories[categoryName] = amount;
    }
  });

  const pieChartData = Object.keys(categories).map((categoryName, index) => ({
    name: categoryName,
    value: categories[categoryName],
    fill: darkColors[index % darkColors.length],
  }));

  const expensesData = dailyData?.groceryExpenses.map((expense) => ({
    date: new Date(expense.date).toLocaleDateString(),
    amount: expense.amount,
  }));

  // Sort the data by date
  //@ts-ignore
  expensesData?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="flex items-baseline w-full mobile-container">
      <div className="flex flex-col graph-container">
        <div className="text-center">Monthly Expense</div>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={pieChartData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="flex flex-col graph-container">
        <div className="text-center mb-5">One Time Expense</div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={expensesData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              name="Expenses"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graphs;
