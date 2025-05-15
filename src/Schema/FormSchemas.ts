import {z} from "zod";


export const FormSchema = z.object({
    username: z.string().min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z.string().min(2, {
        message: "This field has to be filled.",
    })
})


export const NewMemberSchema = z.object({
    lastname: z.string().min(1, { message: "Last name is required." }),
    firstname: z.string().min(1, { message: "First name is required." }),
    address: z.string().min(1, { message: "Address is required." }),
    birthdate: z.string().min(1, { message: "Birthdate is required." }),
    contact: z.string().min(1, { message: "Contact information is required." }),
    school: z.string().min(1, { message: "School information is required." }),
    status: z.string().min(1, { message: "Status is required." }),
});
