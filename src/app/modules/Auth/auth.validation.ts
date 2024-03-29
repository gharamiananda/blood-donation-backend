import { z } from "zod";

const loginUser = z.object({
    body: z.object({
        email: z.string({
            required_error:"email field is required."
        }),
        password: z.string({
            required_error:"password field is required."
        })
    })
});



const registerUser = z.object({
    body: z.object({
        email: z.string({
            required_error:"email field is required."
        }),
        password: z.string({
            required_error:"password field is required."
        }),
        "bloodType": z.string({
            required_error:"bloodType field is required."
        }),
        "location": z.string({
            required_error:"location field is required."
        }),
        "age": z.number({
            required_error:"age field is required."
        }),
        "bio": z.string({
            required_error:"bio field is required."
        }),
        "lastDonationDate": z.string({
            required_error:"lastDonationDate field is required."
        })
    })
});

export const authValidationSchemas = {
    loginUser,
    registerUser
}