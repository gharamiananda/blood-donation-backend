import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";

const getMyProfileFromDB = async (currentUser:JwtPayload) => {

    const {password,...userData} = await prisma.user.findUniqueOrThrow({
        where: {
            id: currentUser?.userId
        },
        include: {
            profile: true,
            
            
          },
    });

    return userData ;
};



const updateMyProfileIntoDB = async (currentUser:JwtPayload,payload:Partial<User>) => {



    const userData = await prisma.userProfile.update({
        where: {
            userId :currentUser.userId as string
        },
            data:payload
        
    });

 

    return userData
};
export const UserServices = {
    getMyProfileFromDB,
    updateMyProfileIntoDB
}