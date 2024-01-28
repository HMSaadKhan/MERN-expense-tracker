import { Router } from "express";

import users from "./users";
import expenses from "./expenses";
import category from "./category";
const router = Router();

router.use("/user", users);
router.use("/expenses", expenses);
router.use("/category", category);

export default router;
