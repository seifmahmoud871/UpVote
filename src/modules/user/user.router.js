import { Router } from "express";
import * as userController from './controller/user.js'
import { validation } from "../../middleware/validation.js";
import * as validators from "./user.validation.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import auth from "../../middleware/auth.middleware.js";

const router=Router();


router.get('/:id/profile/',validation(validators.shareProfile),asyncHandler(userController.shareProfile));
router.get('/profile',auth,asyncHandler(userController.profile));
router.patch('/password',validation(validators.updatePassword),auth,asyncHandler(userController.updatePassword));

export default router;