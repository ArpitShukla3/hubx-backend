import express from "express";
import {
  addImage,
  fetchImage,
  incrementLinkCount,
  updateView,
} from "../controllers/postController.js";
import check from "../middleware/check.js";
const router = express.Router();

router.route("/post").post(check, addImage);
router.get("/images", check, fetchImage);
router.post("/update", updateView);
router.post("/incrementLinkCount", incrementLinkCount);
const mediaRouter = router;
export default mediaRouter;
