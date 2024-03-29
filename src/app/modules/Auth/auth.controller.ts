import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: {
            ... result.userData,
            token: result.accessToken
        }
    })
});
const registerUser = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthServices.createUserIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result
    })
});

export const AuthController = {
    loginUser,
    registerUser
};