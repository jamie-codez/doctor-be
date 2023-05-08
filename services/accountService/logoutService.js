const logoutService = async (req, res) => {
    try {
        if (req?.session?.userId) {
            req.session.destroy();
            return res.status(401).json({ message: "Logout successful" });
        }
        return res.status(401).json({ message: "Not logged in" });
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export default logoutService;