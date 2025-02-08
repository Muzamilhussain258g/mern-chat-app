import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv"

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localPath) => {
    try {
        if (!localPath) return null;

        const avatarData = await cloudinary.uploader.upload(localPath, {
            folder: "chatApp",
            resource_type: "auto"
        })

        fs.unlinkSync(localPath);

        return avatarData;
    } catch (error) {
        fs.unlinkSync(localPath);

        console.log("Error while uploading to Cloudinary: ", error);
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => { }

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}