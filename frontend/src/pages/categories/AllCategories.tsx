import { useEffect, useState } from "react";
import api from "../../common/api";
import { getCategories } from "../../common/urlRoutes";
import { CategoriesI } from "../../components/add-expenses/AddExpenses";
import CategoriesTable from "./components/CategoriesTable";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCategories from "../../components/add-categories/AddCategories";

const AllCategories = () => {
  const [addCategories, setAddCategories] = useState(false);
  const [categories, setCategories] = useState<CategoriesI[]>([]);
  const getCategoriesData = async () => {
    const res = await api.get(getCategories);
    setCategories(res.data);
  };

  useEffect(() => {
    getCategoriesData();
  }, []);
  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: "1%",
          color: "white",

          "@media (max-width: 768px)": {
            position: "fixed",
            top: "40px",
            right: "2%",
          },
        }}
        onClick={() => {
          setAddCategories(true);
        }}
      >
        <AddIcon />
      </Fab>
      <CategoriesTable categories={categories} onDelete={getCategoriesData} />
      {addCategories && (
        <AddCategories
          open={addCategories}
          handleClose={() => {
            setAddCategories(false);
          }}
          getAllCategories={getCategoriesData}
        />
      )}
    </div>
  );
};

export default AllCategories;
