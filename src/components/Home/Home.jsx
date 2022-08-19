import React from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { getPostBySearch } from "../../actions/posts";

import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Paginate from "../Paginate/Paginate";
import TagsInput from "./TagInput";

import useStyles from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("search") || "";

  const [search, setSearch] = React.useState(searchQuery);
  const [tags, setTags] = React.useState([]);
  const [currentId, setCurrentId] = React.useState(null);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) handleSearch();
  };

  const searchPosts = (e) => {
    e.preventDefault();
    if (search.trim() || tags.length) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      setSearch("");
      setTags([]);
      navigate(`/posts/search?search=${search}&tags=${tags.join(",")}`);
    } else {
      navigate("/posts");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                label="Search"
                variant="outlined"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div style={{ margin: "10px 0px" }}>
                <TagsInput
                  selectedTags={(tags) => setTags(tags)}
                  fullWidth
                  variant="outlined"
                  id="tags"
                  name="tags"
                  placeholder="add Tags"
                  label="tags"
                />
              </div>
              <Button
                onClick={searchPosts}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!search && !tags.length && (
              <Paper elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
