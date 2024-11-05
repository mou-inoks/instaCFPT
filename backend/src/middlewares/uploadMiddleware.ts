import multer from "multer";
import path from "path";
import { serverConfig } from "../config/serverConfig";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, serverConfig.uploadDirectory);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;