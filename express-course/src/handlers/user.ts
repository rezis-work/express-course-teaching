import { Request, Response, NextFunction } from "express";
import prisma from "../db";
import { comparePaswords, createJWT, hashPassword } from "../modules/auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: await hashPassword(password),
      },
    });
    const token = createJWT(user);
    res.json({ message: "User created", token });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "Error creating user" });
      }
    }
    next(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isValidUser = await comparePaswords(password, user.password);

    if (!isValidUser) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = createJWT(user);
    res.json({ message: "Signed in", token });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
