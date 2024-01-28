import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllCategories = async (req: any, res: Response) => {
  try {
    const categories = await prisma.category.findMany();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCategory = async (req: any, res: Response) => {
  try {
    const { name } = req.body;

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteCategory = async (req: any, res: Response) => {
  try {
    const categoryId = req.params.id;
    const existingCat = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!existingCat) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllCategories, createCategory, deleteCategory };
