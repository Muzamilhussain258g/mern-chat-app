import { Router } from "express";
import { getMessages, sendMessages, getUsersForSidebar } from "../controllers/message.controllers.js";
import { uploadImages } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getMessages/:id").get(verifyJWT, getMessages);
router.route("/sendMessages/:id").post(verifyJWT, uploadImages.array("messageMedia", 10), sendMessages);
router.route("/getUsers").get(verifyJWT, getUsersForSidebar);



export default router;