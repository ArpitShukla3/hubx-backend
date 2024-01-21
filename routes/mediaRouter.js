import express from "express";
import { addImage, fetchImage, updateView } from "../controllers/postController.js";
import check from "../middleware/check.js";
const router = express.Router();

router.route("/post").post(check,addImage);
router.get("/images/:page",check,fetchImage);
router.post("/update",updateView);
const mediaRouter=router;
export default mediaRouter;

