import { Router, Request, Response } from "express";
import { body, check, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// products

router.get("/product", (req: Request, res: Response) => {
  res.json({ message: "Hello You are authenticated congrats" });
});

router.get("/product/:id", () => {});

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req: Request, res: Response): void => {
    res.json({ message: "Hello You are authenticated congrats" });
  }
);

router.post("/product", body("name").isString(), handleInputErrors, () => {});

router.delete("/product/:id", () => {});

// updates

router.get("/update", () => {});

router.get("/update/:id", () => {});

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  oneOf([
    check("status").equals("IN_PROGRESS"),
    check("status").equals("SHIPPED"),
    check("status").equals("DEPRECATED"),
  ]),
  body("version").optional(),
  () => {}
);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  () => {}
);

router.delete("/update/:id", () => {});

// update points

router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);

router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);

router.delete("/updatepoint/:id", () => {});

export default router;
