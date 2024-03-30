import { UserBloodGroup } from "@prisma/client";
import { z } from "zod";

const loginUser = z.object({
    body: z.object({
       email: z.string({
            required_error: "email field is required."
        }).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/i, {
            message: "Email must be a valid email address."
        }),
        password: z.string({
            required_error:"password field is required."
        })
    })
});





const registerUser = z.object({
    body: z.object({
       email: z.string({
            required_error: "email field is required."
        }).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/i, {
            message: "Email must be a valid email address."
        }),
        password: z.string({
            required_error:"password field is required."
        }),
        "location": z.string({
            required_error:"location field is required."
        }),
        "age": z.number({
            required_error:"age field is required.",
            invalid_type_error:'age must be a valid positive number'
        }),
        "bio": z.string({
            required_error:"bio field is required."
        }),
        "lastDonationDate": z.string({
            required_error:"lastDonationDate field is required."
        }),
        bloodType: z.enum([...Object.values(UserBloodGroup)] as [string, ...string[]]
        
        ,{
                required_error:"bloodType field is required.",
            invalid_type_error:'bloodType must be a valid Blood group type'

            }
        ),

     
       
    })
});

export const authValidationSchemas = {
    loginUser,
    registerUser
}