import React from "react";
import { Typography, Divider, Paper, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, Link } from "react-router-dom";

import useStyles from "./styles";

import { getPost, getPostBySearch } from "../../actions/posts";

const PostDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { post, posts, loading } = useSelector((state) => state.posts);

  React.useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  React.useEffect(() => {
    dispatch(getPostBySearch({ search: "", tags: post?.tags.join(",") }));
    console.log(posts);
  }, [post]);

  if (!post) return null;

  if (loading)
    return (
      <Paper className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );

  const recommendedPosts = posts.filter((p) => p._id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You Might Like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ name, message, title, selectedFile, likes, _id }) => (
                <Link to={`/posts/${_id}`} className={classes.RecomLink}>
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    Likes : {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
