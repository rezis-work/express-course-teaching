import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createUser, signin } from "./handlers/user";
import { RequestHandler, Request, Response, NextFunction } from "express";
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  setTimeout(() => {
    next(new Error("Error"));
  }, 1000);
});

app.use("/api", protect as RequestHandler, router);
app.post("/auth/user", createUser);
app.post("/auth/signin", signin);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
});

export default app;
