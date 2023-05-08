import prisma from "@prisma/client";
import bcrypt from "bcrypt";
import colors from "colors";

const loginService = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            }
        });
        if (!user) {
            return res.status(404).json({ authed: false, message: "User not found" });
        }
        //Check if password is correct
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            return res.status(400).json({ authed: false, message: "Invalid credentials" });
        }
        //Password is corrct
        req.session.userId = user.id;
        return res.status(200).json({ message: req.session.userId });
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red);
        return res.status(401).json({ authed: false, message: "Something went wrong" });
    }
};

export default loginService;