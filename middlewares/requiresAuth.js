const requiresAuth = (req, res, next) => {
    if (req?.session?.userId) {
        next();
    } else {
        res.status(403).json({ authed: false, message: "You are not logged in" });
    }
};

export default requiresAuth;