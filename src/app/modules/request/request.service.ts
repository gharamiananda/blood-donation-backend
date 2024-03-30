import { Prisma, RequestStatus } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";

const createRequestIntoDB = async (currentUser:Record<string,unknown>,payload: any) => {

    const {password,...donarUserData} = await prisma.user.findUniqueOrThrow({
        where: {
            id: payload.donorId
        },
        include: {
            userProfile: true,
            
            
          },
    });

    const createdRequestData= await prisma.request.create({
        data: {
            donorId: payload.donorId,
            phoneNumber: payload.phoneNumber,
            dateOfDonation: payload.dateOfDonation,
            hospitalName: payload.hospitalName,
            hospitalAddress: payload.hospitalAddress,
            reason: payload.reason,
            requesterId:currentUser?.userId as string
        }
    });
    return {
        ...createdRequestData,
        donor: donarUserData

        

    };
};



const getMyDonorRequestsFromDB = async (currentUser:JwtPayload) => {


    const request = await prisma.request.findMany({
        where: {
            donorId: currentUser.userId as string
        },
        include: {
        
            
          requester:{
            select:{
                id : true,
                name : true,
                email : true,
                bloodType : true,
                location : true,
                availability: true
            }
          },
          
            
            
          },

        
    });

    return {request

        

    };
};

 type IAdminFilterRequest = {
    name?: string | undefined;
    email?: string | undefined;
    contactNumber?: string | undefined;
    searchTerm?: string | undefined;
}

 const requestSearchAbleFields = ['name', 'email','bloodType', 'location'];
const getDonorListFromDB = async (params: IAdminFilterRequest, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andCondions: Prisma.RequestWhereInput[] = [];

    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: requestSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };
   

    const whereConditions: Prisma.RequestWhereInput = { AND: andCondions }

    const result = await prisma.request.findMany({
        where: whereConditions,
        include: {
            donor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true,
                    createdAt: true,
                    updatedAt: true,
                    userProfile: true 
                }
            }
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
    
    

    const total = await prisma.request.count({
        where: whereConditions
    });

    const data = result.map(request => (request.donor));
    return {
        meta: {
            page,
            limit,
            total
        },
        data: data
    };
};



const updateStatusRequestIntoDB = async (requestId:string,payload:{status:RequestStatus}) => {

    const request = await prisma.request.update({
        where: {
            id: requestId
        },
       data: {
        requestStatus:payload?.status}

        
    });

    return {request

        

    };
};
export const RequestServices = {
    createRequestIntoDB,
    getMyDonorRequestsFromDB,
    updateStatusRequestIntoDB,
    getDonorListFromDB
}