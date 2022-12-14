import React from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ setCurrentId, currentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  const [postData, setPostData] = React.useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  React.useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      console.log(postData);
    } else {
      dispatch(
        createPost({ ...postData, name: user?.result?.name, likes: [] })
      );
    }
    
    clear();
  };
  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });

    setCurrentId(null);
  };

  if (!user?.result?.name)
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h1">
          Please login to make Memories
        </Typography>
      </Paper>
    );

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {!currentId ? "Creating" : "Editing"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(file) => {
              setPostData({ ...postData, selectedFile: file.base64 });
            }}
          />
        </div>
        <Button
          type="submit"
          className={classes.buttonSubmit}
          variant="contained"
          color="success"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
