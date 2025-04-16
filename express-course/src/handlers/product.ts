import { Request, Response } from "express";
import prisma from "../db";
import jwt from "jsonwebtoken";
declare module "express-serve-static-core" {
  interface Request {
    user: { id: string } | string | jwt.JwtPayload;
  }
}

export interface ProductRequest extends Request {
  user: { id: string };
}

// Get all products
export const getProducts = async (req: ProductRequest, res: Response) => {
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
export const getOneProduct = async (req: ProductRequest, res: Response) => {
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

export const createProduct = async (req: ProductRequest, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const updateProduct = async (req: ProductRequest, res: Response) => {
  const id = req.params.id;
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

export const deleteProduct = async (req: ProductRequest, res: Response) => {
  const id = req.params.id;
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id,
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: deleted });
};
