import prisma from "../../constants/config.js";

const whoAmIService = async (req, res) => {
    try {
        const user = await prisma.findUnique({
            where: {
                id: req?.session?.userId,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                userRole: true
            },
        });

        if (!user) return res.status(404).json({ authed: false, message: "User not found" })
        return res.status(200).json({ authed: true, user });
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red);
        return res.status(400).json({message:"Something went wrong"});
    }
};

export default whoAmIService;