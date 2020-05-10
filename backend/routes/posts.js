const express = require("express")
const router = express.Router();
const Post = require("../models/post")
const fs = require('fs')

const fileExtract = require('../middleware/file')

const authService = require('../middleware/check-auth')

const postController = require('../controller/post-controller')

router.post('/addPost',authService,fileExtract, postController.addPost)  //multer(storage).single("image") --> fetches single file and try to find image property in request body.

router.get('/getPost', postController.getPost);

router.put("/updatePost",authService,fileExtract,postController.updatePost)

router.get("/getPostById/:postId",postController.getPostById);

router.delete("/deletePost/:id",authService, postController.deletePost);

module.exports = router;
