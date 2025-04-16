import { Response } from "express";
import prisma from "../db";
import { Update } from "@prisma/client";
// import { Update } from "@prisma/client";

export interface UpdateRequest extends Request {
  params: { id: string };
  user: { id: string };
  body: {
    id: string;
    title: string;
    body: string;
    updatedAt: Date;
    productId: string;
  } & Request["body"];
}

export const getUpdates = async (req: UpdateRequest, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });

  // const updates = products.reduce<Update[]>((allUpdates, product) => {
  //   return [...allUpdates, ...product.Update];
  // }, []);

  res.json({ data: products.map((product) => product.Update) });
};

export const getOneUpdate = async (req: UpdateRequest, res: Response) => {
  const productId = req.params.id;
  const update = await prisma.update.findUnique({
    where: {
      id: productId,
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req: UpdateRequest, res: Response) => {
  const productId = req.body.id;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

export const updateUpdate = async (req: UpdateRequest, res: Response) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });

  const updates = product.reduce<Update[]>((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.status(404).json({ message: "Update not found" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};
export const deleteUpdate = async (req: UpdateRequest, res: Response) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });

  const updates = product.reduce<Update[]>((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.status(404).json({ message: "Update not found" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
