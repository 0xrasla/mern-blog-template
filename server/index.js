import { config } from "dotenv";
config();

import cors from "cors";
import Express from "express";
import morgan from "morgan";
import baseRouter from "./src/controllers/index.js";

const app = Express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(Express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api", baseRouter);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`Server is listening : http://${host}:${port}`);
});
