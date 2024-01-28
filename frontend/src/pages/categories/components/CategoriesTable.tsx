import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { FC } from "react";
import { CategoriesI } from "../../../components/add-expenses/AddExpenses";
import { Delete } from "@mui/icons-material";
import api from "../../../common/api";
import { deleteCategories } from "../../../common/urlRoutes";

interface CategoriesTableI {
  categories: CategoriesI[];
  onDelete: () => void;
}

const CategoriesTable: FC<CategoriesTableI> = ({ categories, onDelete }) => {
  const deleteCategory = async (id: string) => {
    const res = await api.delete(deleteCategories + id);
    if (res.status === 200) {
      onDelete();
    }
  };
  return (
    <TableContainer className="flex justify-center items-center">
      <Table sx={{ maxWidth: "500px" }}>
        <TableHead>
          <TableRow sx={{ "&:hover": { background: "none" } }}>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!categories &&
            categories.map((cat) => {
              return (
                <TableRow key={cat.id}>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    <Delete
                      className="cursor-pointer"
                      onClick={() => deleteCategory(cat.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
