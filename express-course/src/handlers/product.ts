import { Request, Response } from "express";
import prisma from "../db";

// Get all products
export const getProducts = async (
  req: Request & { user: number },
  res: Response
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Product: true,
    },
  });

  if (!user) {
    res.status(404);
    res.json({ error: "User not found" });
    return;
  }

  res.json({ data: user.Product });
};

// Get one product
export const getOneProduct = async (
  req: Request & { user: number },
  res: Response
) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  if (!product) {
    res.status(404);
    res.json({ error: "Product not found" });
    return;
  }

  res.json({ data: product });
};
