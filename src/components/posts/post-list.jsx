import React, { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import useHttp from "../../hooks/http";
import { FETCH_POSTS_URL } from "../../http-urls";
import PostCard from "./post-card";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { request } = useHttp();
  const [search, setSearch] = useState("");

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

  const filteredPosts = () => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        post.description.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  };

  return (
    <div className="post-list-container">
      <FormControl
        placeholder="Type to Search"
        type="search"
        onChange={handleChange}
        className="search-post"
      />

      <div className="post-list">
        {filteredPosts().map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
