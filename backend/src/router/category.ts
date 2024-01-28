import { Router } from "express";
import { createCategory, getAllCategories,deleteCategory } from "../controller";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);

export default router;
