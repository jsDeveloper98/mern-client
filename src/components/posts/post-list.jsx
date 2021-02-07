import { filter } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import useHttp from "../../hooks/http";
import { FETCH_POSTS_URL } from "../../http-urls";
import { postCategories } from "../../services/post-service";
import NoPost from "./no-post";
import PostCard from "./post-card";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { request } = useHttp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);

  const fetchPosts = useCallback(async () => {
    const posts = await request(FETCH_POSTS_URL, "GET", null);
    setPosts(posts);
  }, [request]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPostsByCategories = () => {
    if (!category || category === "no filters") {
      return posts;
    }

    return filter(posts, { category });
  };

  const filteredPosts = () => {
    return filteredPostsByCategories().filter(
      (post) =>
        post.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        post.description.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  };

  return (
    <div className="post-list-container">
      <div className="post-filters-wrapper">
        <FormControl
          placeholder="Type to Search"
          type="search"
          onChange={handleChange}
          className="search-posts"
        />

        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={category ? category : "Choose to Filter"}
        >
          {[...postCategories, "no filters"].map((category, i) => (
            <Dropdown.Item onSelect={() => setCategory(category)} key={i}>
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      {filteredPosts().length ? (
        <div className="post-list">
          {filteredPosts().map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <NoPost />
      )}
    </div>
  );
};

export default PostList;
