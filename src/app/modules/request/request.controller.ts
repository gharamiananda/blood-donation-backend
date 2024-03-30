import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
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


const donorFilterableFields = ['bloodType', 'searchTerm', 'bloodType','availability'];

const getDonorList: RequestHandler = catchAsync(async (req: Request, res: Response) => {
   
    const filters = pick(req.query, donorFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  
    const result = await RequestServices.getDonorListFromDB(filters, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Donors successfully found",
        meta: result.meta,
        data: result.data
    })
})

export const RequestController = {
    createRequest,
    getMyDonorRequests,
    updateStatusRequest,
    getDonorList
};