import registerService from "../services/accountService/registerService.js";

const register = async (req, res) => {
    await registerService(req, res);
};

export { register };