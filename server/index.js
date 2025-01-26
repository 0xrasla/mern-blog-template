import { config } from "dotenv";
config();

import cors from "cors";
import Express from "express";
import { connect } from "mongoose";
import morgan from "morgan";
import baseRouter from "./src/controllers/index.js";

const app = Express();

const url = process.env.DB_URL;

async function initServer() {
  try {
    await connect(url, {
      dbName: "blog",
    }).then(() => {
      console.log("Connected to MongoDB");
    });

    app.use(cors());
    app.use(morgan("dev"));
    app.use(Express.json());

    app.use("/api", baseRouter);

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || "localhost";

    app.listen(port, () => {
      console.log(`Server is listening : http://${host}:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

initServer();
