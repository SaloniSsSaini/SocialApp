import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
  Button
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function PostCard({ post, refresh, darkMode }) {
  const [comment, setComment] = useState("");
  const [notif, setNotif] = useState("");

  const likePost = async () => {
    await API.put(`/posts/like/${post._id}`);
    setNotif("Liked ❤️");
    refresh();
  };

  const addComment = async () => {
    if (!comment) return;

    await API.post(`/posts/comment/${post._id}`, {
      username: "User",
      text: comment
    });

    setNotif("Comment added 💬");
    setComment("");
    refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
          boxShadow: 3,
          background: darkMode ? "#1e1e1e" : "#fff",
          color: darkMode ? "#fff" : "#000"
        }}
      >
        <CardContent>

          {/* 🔥 TEXT */}
          <Typography variant="body1">{post.text}</Typography>

          {/* 🔥 IMAGE */}
          {post.image && (
            <img
              src={`https://socialapp-3-ah53.onrender.com/${post.image}`}
              alt=""
              style={{
                width: "100%",
                marginTop: 10,
                borderRadius: 10
              }}
            />
          )}

          {/* 🔥 LIKE + COMMENT */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <IconButton onClick={likePost}>
              <FavoriteIcon color="error" />
            </IconButton>
            <Typography>{post.likes.length}</Typography>

            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </Box>

          {/* 🔔 NOTIFICATION */}
          {notif && (
            <Typography sx={{ color: "green", fontSize: 12 }}>
              {notif}
            </Typography>
          )}

          {/* 💬 COMMENT INPUT */}
          <TextField
            fullWidth
            size="small"
            placeholder="Add comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 1 }}
          />

          <Button onClick={addComment} sx={{ mt: 1 }}>
            Send
          </Button>

          {/* 🔥 COMMENTS */}
          {post.comments.map((c, i) => (
            <Typography key={i} variant="body2">
              <b>{c.username}:</b> {c.text}
            </Typography>
          ))}

        </CardContent>
      </Card>
    </motion.div>
  );
}