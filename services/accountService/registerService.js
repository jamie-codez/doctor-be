import prisma from "../../constants/config.js";
import bcrypt from "bcrypt";

const registerService = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const emailExists = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (emailExists) {
            return res.status(409).json({ message: "Email already exists" });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const account = await prisma.user.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                userRole: role
            },
        });
        req.session.userId = account.id;
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        res.status(500).json({ message: "Error occurred try again" });
    }
};

export default registerService;