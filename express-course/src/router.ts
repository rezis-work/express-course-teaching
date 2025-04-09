import { Router, Request, Response } from "express";

const router = Router();

// products

router.get("/product", (req: Request, res: Response) => {
  res.json({ message: req.body });
});

router.get("/product/:id", () => {});

router.put("/product/:id", () => {});

router.post("/product", () => {});

router.delete("/product/:id", () => {});

// updates

router.get("/update", () => {});

router.get("/update/:id", () => {});

router.put("/update/:id", () => {});

router.post("/update", () => {});

router.delete("/update/:id", () => {});

// update points

router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.put("/updatepoint/:id", () => {});

router.post("/updatepoint", () => {});

router.delete("/updatepoint/:id", () => {});

export default router;
