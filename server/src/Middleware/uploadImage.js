import express from "express";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { uploadImage, deleteImages } from "./uploadImageToCloudinary.js";
import { setRedisCache, getRedisCache } from "../Utils/redis.js";

const router = express.Router();

const upload = multer({ dest: "src/uploads/" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/api/upload", upload.single("image"), async (req, res) => {
  const image = req.file;
  try {
    const cloudImage = await uploadImage(image.path);
    res.status(200).json({ image: cloudImage });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/uploads/:imageId", (req, res) => {
//   try {
//     const imageId = req.params.imageId;
//     const imagePath = path.join(__dirname, "../uploads", imageId);
//     const contentType = "image/jpeg";
//     res.set("Content-Type", contentType);
//     res.sendFile(imagePath);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.delete("/uploads/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const cFileName = filename ? filename.split(".") : [];

    const filePath = path.join(__dirname, "../uploads", cFileName[0]);
    filename && (await deleteImages(filename));
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

router.post("/api/pwa", async (req, res, next) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    await setRedisCache(`${id}pwa`, id);
    res.status(201).json({ message: "Key set successfully" });
  } catch (error) {
    next(error);
  }
});

router.get("/api/pwa/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const value = await getRedisCache(`${id}pwa`);
    res.status(201).json({ message: "Key set successfully", data: value });
  } catch (error) {
    next(error);
  }
});

export default router;
