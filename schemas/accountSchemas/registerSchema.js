import { z } from "zod";
import { UserRole } from "@prisma/client";

const registrationSchema = z.object({
    email: z.string().email().min(1, { message: "Email is missing" }),
    firstName: z.string().min(1, { message: "First Name is missing" })
        .min(2, { message: "First Name must be atleast 2 characters long" })
        .max(50, { message: "First Name mut be a maximum of 50 characters" }),
    lastName: z.string().min(1, { message: "Last Name is missing" })
        .min(2, { message: "Last Name must be atleast 2 characters long" })
        .max(50, { message: "Last Name mut be a maximum of 50 characters" }),
    password: z.string().min(5, { message: "Password must be atleast 5 characters" })
        .max(50, { message: "Password must be a maxomum of 50 characters" }),
    role: z.nativeEnum([UserRole.DOCTOR, UserRole.PATIENT], {
        errorMap: (issue, ctx) => {
            return { message: "Role is missing or invalid" };
        },
    }),
});