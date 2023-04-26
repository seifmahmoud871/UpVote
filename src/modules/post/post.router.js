import { Router } from "express";
import * as postController from './controller/post.js'
import fileUpload, { fileValidation } from "../../utils/multer.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './post.validation.js'
import auth from '../../middleware/auth.middleware.js'
import * as commentController from './controller/comment.js'
const router = Router();



router.post('/createPost', auth, fileUpload('post', fileValidation.image).single('image'), validation(validators.creatPost), asyncHandler(postController.createPost));
router.patch('/:id/like', auth, asyncHandler(postController.likePost));
router.patch('/:id/unLike', auth, validation(validators.likeOrUnlikePost), asyncHandler(postController.unLikePost));
router.get('/posts',asyncHandler(postController.getPosts))

// =============================================== Comment section ==========================================================

router.post('/:id/comment', auth, fileUpload('/post', fileValidation.image).single('image'), validation(validators.creatComment), asyncHandler(commentController.createComment));
router.post('/:id/comment/:commentId/reply', auth, fileUpload('/post', fileValidation.image).single('image'), validation(validators.replyComment), asyncHandler(commentController.createReplyOnComment));


export default router;