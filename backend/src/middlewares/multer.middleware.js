import multer from "multer"
import { ApiError } from "../utils/apiError.js";

// Define storage for videos
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp'); // Specify the directory to save images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});


// Create the upload middleware for images
export const uploadImages = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new ApiError(400, 'Please upload an image'), false);
        }
        cb(null, true);
    }
});