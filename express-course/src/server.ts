import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
const app = express();

const customLogger =
  (message: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`Hello from the custom logger ${message}`);
    next();
  };

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

app.use(customLogger("doggy"));

app.use((req: Request, res: Response, next: NextFunction) => {
  const userMessage = req.body;
  console.log(userMessage);

  // res.status(401).json({ message: "unauthorized" });
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the express course" });
});

app.use("/api", router);

export default app;
