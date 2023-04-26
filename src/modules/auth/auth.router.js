import { Router } from "express";
import * as authController from './controller/auth.js'
import {validation} from '../../middleware/validation.js'
import { asyncHandler } from "../../utils/errorHandling.js";
import * as authValidators from './auth.validation.js'
const router=Router();



router.get('/authModule',asyncHandler(authController.authModule));
router.post('/login',validation(authValidators.loginSchema),asyncHandler(authController.login));
router.post('/signUp',validation(authValidators.signupSchema),asyncHandler(authController.signUp));
router.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail));
router.get('/newConfirmEmail/:token',asyncHandler(authController.newConfirmEmail));

export default router;