const express = require("express");
const router = express.Router();


const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const postController = require("../controllers/postController");

// 🔍 DEBUG LOG (IMPORTANT)
console.log("auth:", auth);
console.log("upload:", upload);
console.log("createPost:", postController.createPost);

// ✅ ROUTES
router.post("/", auth, upload.single("image"), postController.createPost);

router.get("/", auth, postController.getPosts);

router.put("/like/:id", auth, postController.likePost);

router.post("/comment/:id", auth, postController.commentPost);
router.post("/", auth, upload.single("image"), postController.createPost);

module.exports = router;