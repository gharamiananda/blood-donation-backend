import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        userId: userData.id
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        userId: userData.id
    },
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
        userData:{
            id: userData.id,
            name: userData.name,

            email: userData.email,

        }

    };
};

const createUserIntoDB = async (req: Request) => {

    const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {

            "name": req.body.name,

      
            "email":  req.body.email,
            "password": hashedPassword,
            "bloodType":req.body.bloodType,
            "location": req.body.location,
            availability: req.body.availability
            
    
    }

    const profileData={

        "age":req.body.age,
        "bio": req.body.bio,
        "lastDonationDate": req.body.lastDonationDate
    }

    const result = await prisma.$transaction(async (transactionClient) => {
       const createdUserData= await transactionClient.user.create({
            data: userData
        });

        const created = await transactionClient.userProfile.create({
            data: {...profileData,userId:createdUserData.id as string}
        });
        const {password,...restData}=createdUserData;

        return {...restData,userProfile:created};
    });

    return result;
    

};

export const AuthServices = {
    loginUser,createUserIntoDB
}