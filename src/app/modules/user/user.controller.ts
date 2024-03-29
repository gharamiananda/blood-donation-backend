import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./request.service";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getMyProfileFromDB(req?.currentUser);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile retrieved successfully",
        data: result
    })
});

const updateUserProfile= catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.updateMyProfileIntoDB(req?.currentUser,req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully",
        data: result
    })
});
export const UserController = {
    getMyProfile,
    updateUserProfile
};