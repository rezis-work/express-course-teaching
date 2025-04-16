import { Router } from "express";
import { RequestHandler } from "express";
import { body, check, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";

const router = Router();

// products

router.get("/product", getProducts as RequestHandler);

router.get("/product/:id", getOneProduct as RequestHandler);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct as RequestHandler
);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct as RequestHandler
);

router.delete("/product/:id", deleteProduct as RequestHandler);

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
