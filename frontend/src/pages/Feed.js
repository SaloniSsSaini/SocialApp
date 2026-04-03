import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Switch,
  Box
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";

import PostCard from "../components/PostCard";
import ImageUpload from "../components/ImageUpload";
import Navbar from "../components/Navbar";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchPosts = () => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("text", text);
      if (file) formData.append("image", file);

      await API.post("/posts", formData);

      setText("");
      setFile(null);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    
    <Box sx={{ background: darkMode ? "#121212" : "#f5f5f5", minHeight: "100vh" }}>

      {/* 🔥 HEADER */}
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Social Feed 🚀</Typography>

          <Brightness4Icon />
          <Switch onChange={() => setDarkMode(!darkMode)} />

          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Navbar />

      <Container maxWidth="sm">

        {/* 🔥 CREATE POST */}
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>

            <Typography variant="h6">Create Post</Typography>

            <TextField
              fullWidth
              label="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ mt: 2 }}
            />

            <ImageUpload file={file} setFile={setFile} />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={createPost}
            >
              Post 🚀
            </Button>

          </CardContent>
        </Card>

        {/* 🔥 FEED */}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} refresh={fetchPosts} darkMode={darkMode} />
        ))}

      </Container>
    </Box>
  );
}