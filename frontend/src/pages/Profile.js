import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

import {
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid
} from "@mui/material";

export default function Profile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      <Navbar />

      <Container maxWidth="sm">

        {/* 🔥 PROFILE HEADER */}
        <Card sx={{ mt: 3, p: 3, textAlign: "center", borderRadius: 3 }}>
          <Avatar
            sx={{ width: 80, height: 80, margin: "auto", mb: 1 }}
          />
          <Typography variant="h6">User Name</Typography>
          <Typography variant="body2" color="gray">
            {posts.length} Posts
          </Typography>
        </Card>

        {/* 🔥 POSTS GRID */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {posts.map((post) => (
            <Grid item xs={6} key={post._id}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>

                  {post.image ? (
                    <img
                      src={`http://localhost:5000/${post.image}`}
                      alt=""
                      style={{ width: "100%", borderRadius: 10 }}
                    />
                  ) : (
                    <Typography>{post.text}</Typography>
                  )}

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </>
  );
}