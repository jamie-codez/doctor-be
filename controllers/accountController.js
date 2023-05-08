import registerService from "../services/accountService/registerService.js";
import loginService from "../services/accountService/loginService.js";
import logoutService from "../services/accountService/logoutService.js";
import whoAmIService from "../services/accountService/whoAmIService.js";

const register = async (req, res) => {
    await registerService(req, res);
};

const login = async (req, res) => {
    await loginService(req, res);
};

const logout = async (req, res) => {
    await logoutService(req, res);
}

const whoAmI = async (req, res) => {
    await whoAmIService(req, res);
}

export { register, login, logout, whoAmI };