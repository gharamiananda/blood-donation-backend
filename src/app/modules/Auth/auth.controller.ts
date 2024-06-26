import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken,{
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure: process.env.NODE_ENV === 'production',
      secure: true,
      sameSite: "none",
      // domain: 'https://knighthunt.vercel.app'
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
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
