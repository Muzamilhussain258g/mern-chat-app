import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
    },
    media: [
        { type: String }
    ],
    mediaPublicId: [
        { type: String }
    ]
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);