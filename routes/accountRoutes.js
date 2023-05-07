import { Router } from "express";
import * as accountController from "../controllers/accountController.js";
import validateRequestBody from "../middlewares/validateBody.js";
import registerSchema from "../schemas/accountSchemas/registerSchema.js";

const router = Router();

router.post("/register", validateRequestBody(registerSchema), accountController.register);


export default router;