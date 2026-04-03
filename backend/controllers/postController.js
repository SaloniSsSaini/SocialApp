const Post = require("../models/Post");

// ✅ CREATE POST (FIXED - image support added)
exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      text: req.body.text,
      image: req.file ? req.file.path : "",
      userId: req.user.id
    });

    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ GET POSTS (pagination safe)
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(page * 5)
      .limit(5);

    res.json(posts);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ LIKE / UNLIKE (safe toggle)
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json("Post not found");

    if (post.likes.includes(req.user.id)) {
      post.likes.pull(req.user.id); // unlike
    } else {
      post.likes.push(req.user.id); // like
    }

    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ COMMENT (safe + structured)
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json("Post not found");

    post.comments.push({
      userId: req.user.id,
      username: req.body.username || "User",
      text: req.body.text,
      createdAt: new Date()
    });

    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};