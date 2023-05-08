import { Router } from "express";
import * as accountController from "../controllers/accountController.js";
import validateRequestBody from "../middlewares/validateBody.js";
import registerSchema from "../schemas/accountSchemas/registerSchema.js";
import loginSchema from "../schemas/accountSchemas/loginSchema.js";
import requiresAuth from "../middlewares/requiresAuth.js";

const router = Router();

router.post("/register", validateRequestBody(registerSchema), accountController.register);

router.post("/login",validateRequestBody(loginSchema),accountController.login);

router.post("/logout",accountController.logout);

router.post("/whoAmI",requiresAuth,accountController.whoAmI);


export default router;