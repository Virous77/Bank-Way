import express from "express";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

const upload = multer({ dest: "src/uploads/" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/api/upload", upload.single("image"), async (req, res) => {
  const image = req.file;
  try {
    res
      .status(200)
      .json({ image: `${process.env.FRONTEND_URL}/${image.filename}` });
  } catch (error) {
    console.log(error);
  }
});

router.get("/uploads/:imageId", (req, res) => {
  try {
    const imageId = req.params.imageId;
    const imagePath = path.join(__dirname, "../uploads", imageId);
    const contentType = "image/jpeg";
    res.set("Content-Type", contentType);
    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/uploads/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(200).json({ message: "Image not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
