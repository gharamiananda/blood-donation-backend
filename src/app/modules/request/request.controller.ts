import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RequestServices } from "./request.service";

const createRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await RequestServices.createRequestIntoDB(req?.currentUser,req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Request successfully made",
        data: result
    })
});

const getMyDonorRequests = catchAsync(async (req: Request, res: Response) => {
    const result = await RequestServices.getMyDonorRequestsFromDB(req?.currentUser);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Donation requests retrieved successfully",
        data: result
    })
});

const updateStatusRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await RequestServices.updateStatusRequestIntoDB(req.params.requestId, req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Donation request status successfully updated",
        data: result
    })
});
export const RequestController = {
    createRequest,
    getMyDonorRequests,
    updateStatusRequest
};