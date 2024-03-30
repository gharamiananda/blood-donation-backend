import { z } from "zod";


const updateProfile = z.object({
    body: z.object({
        "age": z.number({
            required_error:"age field is required."
        }).optional(),
        "bio": z.string({
            required_error:"bio field is required."
        }).optional(),
        "lastDonationDate": z.string({
            required_error:"lastDonationDate field is required."
        }).optional()
    })
});

export const userValidationSchemas = {
   
    updateProfile
}