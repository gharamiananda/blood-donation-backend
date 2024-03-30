import { RequestStatus } from "@prisma/client";
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

    return request;
};

 type IAdminFilterRequest = {
    name?: string | undefined;
    email?: string | undefined;
    contactNumber?: string | undefined;
    searchTerm?: string | undefined;
    bloodType?: string  | undefined;
    availability?: boolean  | undefined;


}

 const requestSearchAbleFields = ['name', 'email','bloodType','location'];
const getDonorListFromDB = async (params: IAdminFilterRequest, options: IPaginationOptions) => {
    const { page, limit, skip ,sortBy,sortOrder} = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const whereConditions:Record<string,unknown> = {};
    if (searchTerm) {
      whereConditions.OR =   
      
      requestSearchAbleFields.map(field => ({
        [field]: {
            contains: params.searchTerm,
            mode: 'insensitive'
        }
    }))
    }
    if (filterData.bloodType) {
      whereConditions.bloodType = filterData.bloodType;
    }
    
      whereConditions.availability = filterData.availability||false;
    
    let orderBy :Record<string,unknown>= {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder === 'desc' ? 'desc' : 'asc';
    }
    if(sortBy==='age' ||sortBy==='lastDonationDate'){
        orderBy=  {
            userProfile:{

                [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc'
            }
            
            
        }
    }
  


    // Fetch paginated and filtered users (donors) from the database
    const users = await prisma.user.findMany({
      where: whereConditions,
    //   include: {
    //     userProfile: true,


    //   },
    select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        location: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
        userProfile:true
      },
      

      orderBy,

      skip: (page - 1) * limit,
      take: limit
    });

    // Fetch total count of users matching the filter criteria
    const totalCount = await prisma.user.count({ where: whereConditions });

    // Prepare response object
    const response = {
      meta: {
        total: totalCount,
        page:  page,
        limit:limit
      },
      data: users
    };
return response
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