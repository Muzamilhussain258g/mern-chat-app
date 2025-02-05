import { Router } from "express";
import {
    deleteAllUser, login, registerUser,
    getCurrentUser, logout, changePassword,
    updateAvatar, editBio
} from "../controllers/user.controllers.js";
import { uploadImages } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// normal routes
router.route("/register").post(uploadImages.single("avatar"), registerUser);
router.route("/login").post(login);
router.route("/deleteAllUser").delete(deleteAllUser);

// secured routes
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);
router.route("/logout").get(verifyJWT, logout);
router.route("/changePassword").patch(verifyJWT, changePassword);
router.route("/updateAvatar").patch(verifyJWT, uploadImages.single("avatar"), updateAvatar);
router.route("/editBio").patch(verifyJWT, editBio);

export default router;
