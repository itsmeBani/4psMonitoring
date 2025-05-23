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
    house_no: z.string().min(1, { message: "House number is required." }),
    firstname: z.string().min(1, { message: "First name is required." }),
    middle_name: z.string().min(1, { message: "Middle name is required." }),
    address: z.string().min(1, { message: "Address is required." }),
    birthdate: z.string().min(1, { message: "Birthdate is required." }),
    contact: z.string().min(1, { message: "Contact information is required." }),
});

export const NewStudentSchema = z.object({

    firstname: z.string().min(1, { message: "First name is required." }),
    lastname: z.string().min(1, { message: "Last name is required." }),
    middlename: z.string().min(1, { message: "Middle name is required." }),
    birthdate: z.string().min(1, { message: "Birthdate is required." }),
    LRN: z.string().min(1, { message: "LRN is required." }),
    gradelevel: z.string().min(1, { message: "Grade level is required." }),
    schoolname: z.string().min(1, { message: "School name is required." }),
    schooladdress: z.string().min(1, { message: "School address is required." }),
    schoolID: z.string().min(1, { message: "School ID is required." }),
    schooltype: z.string().min(1, { message: "School type is required." }),
    status: z.string().min(1, { message: "Status is required." }),
    schoollevel: z.string().min(1, { message: "School level is required." }),
    schoolyearstart: z
        .string()
        .regex(/^\d{4}$/, "Enter a valid  year."),
     schoolyearend: z
        .string()
        .regex(/^\d{4}$/, "Enter a valid  year.")
});