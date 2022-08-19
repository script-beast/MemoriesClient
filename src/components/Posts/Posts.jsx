import React from "react";
import { Typography, Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

import useStyles from "./styles";

import Post from "./Post/Post";

function Posts({ setCurrentId }) {
  const classes = useStyles();
  const { posts, loading } = useSelector((state) => state.posts);

  if (!posts.length && !loading)
    return (
      <Typography variant="h1" component="h2">
        No posts found
      </Typography>
    );

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
