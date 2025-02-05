import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const getUsersForSidebar = asyncHandler(async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user?._id } }).select("-password -refreshToken").sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
})

const getMessages = asyncHandler(async (req, res) => {
    const { id: receiverId } = req.params;

    const { _id: myId } = req.user;

    const messages = await Message.find({
        $or: [
            { sender: myId, receiver: receiverId },
            { sender: receiverId, receiver: myId }
        ]
    }).populate("sender", "username avatarUrl").populate("receiver", "username avatarUrl").sort({ createdAt: 1 })

    return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"))

})

const sendMessages = asyncHandler(async (req, res) => {
    const { id: receiverId } = req.params;

    const { _id: senderId } = req.user; // const senderId = req.user._id  // you can write do this

    const { text } = req.body;

    if (!text && (!req.files || req.files.length <= 0)) throw new ApiError(400, "Text or media is required for message");

    let messageMediaLocalPaths = [];

    if (req.files && req.files?.length > 0) {
        messageMediaLocalPaths = req.files.map((file) => ({ mediaLocalPath: file.path }));
    }

    let messageMediaDocs = [];

    if (messageMediaLocalPaths.length > 0) {
        messageMediaDocs = await Promise.all(messageMediaLocalPaths.map(async (file) => {
            const media = await uploadOnCloudinary(file.mediaLocalPath);
            return media;
        }));
    }

    const message = await Message.create({
        sender: senderId,
        receiver: receiverId,
        text,
        media: messageMediaDocs?.map((file) => file.secure_url),
        mediaPublicId: messageMediaDocs?.map((file) => file.public_id)
    })

    return res.status(201).json(new ApiResponse(201, message, "Message sent successfully"))
});

export {
    getMessages,
    sendMessages,
    getUsersForSidebar
}