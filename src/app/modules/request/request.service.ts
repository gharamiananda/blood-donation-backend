import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";

const createRequestIntoDB = async (currentUser:Record<string,unknown>,payload: any) => {

    const {password,...donarUserData} = await prisma.user.findUniqueOrThrow({
        where: {
            id: payload.donorId
        },
        include: {
            profile: true,
            
            
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
        
            
          requesterUser:{
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



const updateStatusRequestIntoDB = async (requestId:string,payload:any) => {

    const request = await prisma.request.update({
        where: {
            id: requestId
        },
       data: payload

        
    });

    return {request

        

    };
};
export const RequestServices = {
    createRequestIntoDB,
    getMyDonorRequestsFromDB,
    updateStatusRequestIntoDB
}