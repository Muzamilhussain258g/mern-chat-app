import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!token) throw new ApiError(401, "Unauthorized request");

    const decodedToken = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) throw new ApiError(401, "Invalid token or Expired token");

    req.user = user;
    next();
})

export {
    verifyJWT
}