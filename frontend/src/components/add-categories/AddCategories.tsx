import { Box, Typography, Button, Dialog, TextField } from "@mui/material";
import { FC, useState } from "react";
import { createCategories } from "../../common/urlRoutes";
import api from "../../common/api";

interface AddCategoriesI {
  open: boolean;
  handleClose: () => void;
  getAllCategories: () => Promise<void>;
}
export interface CategoriesI {
  id: string;
  name: string;
}

const AddCategories: FC<AddCategoriesI> = ({
  open,
  handleClose,
  getAllCategories,
}) => {
  const [category, setCategory] = useState("");

  const addCategory = async () => {
    const res = await api.post(createCategories, {
      name: category,
    });

    if (res.status === 201) {
      handleClose();
      getAllCategories();
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
          Add Category
        </Typography>

        <Box className="my-5">
          <TextField
            fullWidth
            placeholder="Name of category"
            size="small"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </Box>
        <Box className="flex my-3 justify-end">
          <Box className="mx-3">
            <Button variant="contained" onClick={addCategory}>
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

export default AddCategories;
