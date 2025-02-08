import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



const deleteAllUser = asyncHandler(async (req, res) => {
    await User.deleteMany({})

    return res.status(200).json(new ApiResponse(200, null, "All users deleted successfully"))
})

const registerUser = asyncHandler(async (req, res) => {


    const { username, email, password } = req.body;

    if ([username, email, password].some((el) => el?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const isUserExist = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isUserExist) throw new ApiError(400, "User already exist");

    // console.log(req.file)
    const avatarLocalPath = req.file?.path
    // console.log(avatarLocalPath)

    let avatar;
    if (avatarLocalPath) {
        avatar = await uploadOnCloudinary(avatarLocalPath)
    }

    console.log(username)

    const user = await User.create({
        username,
        email,
        password,
        avatarUrl: avatar?.secure_url || "",
        avatarPublicId: avatar?.public_id || null,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(201).json(new ApiResponse(201, createdUser, "User created succesfully"))
})

const login = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) throw new ApiError(400, "Either username or email is required")

    if (!password) throw new ApiError(400, "Password is required")

    const user = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) throw new ApiError(400, "User doesnot exist")

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) throw new ApiError(400, "Invalid credentials")

    const { accessToken, refreshToken } = await user.generateAccessAndRefreshToken()

    user.refreshToken = refreshToken;
    await user.save()

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, loggedInUser, "User logged in successfully"))

})

const logout = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user?._id, {
        $unset: {
            refreshToken: true // remove refreshToken from user
        }
    });

    return res.status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json(new ApiResponse(200, null, "User logged out successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"))
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) throw new ApiError(400, "Old password and new password is required")

    const isPasswordCorrect = await req.user.comparePassword(oldPassword)

    if (!isPasswordCorrect) throw new ApiError(400, "Invalid password")

    req.user.password = newPassword;
    await req.user.save()

    return res.status(200).json(new ApiResponse(200, null, "Password changed successfully"))
})

const updateAvatar = asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, "Avatar is required")
    const avatarLocalPath = req.file?.path

    let avatar;
    if (avatarLocalPath) {
        avatar = await uploadOnCloudinary(avatarLocalPath)
    }

    req.user.avatarUrl = avatar?.secure_url || "";
    req.user.avatarPublicId = avatar?.public_id || null;

    await req.user.save()

    return res.status(200).json(new ApiResponse(200, req.user, "Avatar updated successfully"))
})

const editBio = asyncHandler(async (req, res) => {
    const { bio } = req.body;

    if (!bio) throw new ApiError(400, "Bio is required")

    req.user.bio = bio;
    await req.user.save()

    return res.status(200).json(new ApiResponse(200, req.user, "Bio updated successfully"))
})

export {
    registerUser,
    deleteAllUser,
    login,
    getCurrentUser,
    logout,
    changePassword,
    updateAvatar,
    editBio
}
