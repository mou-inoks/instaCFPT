import express, { Application } from "express";
import path from "path";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes";
import { serverConfig } from "./config/serverConfig";

const app: Application = express();

app.use(cors({
  origin: "*", // TODO : Change with app url
}));

app.use("/uploads", express.static(serverConfig.uploadDirectory));

app.use(uploadRoutes);

export default app;