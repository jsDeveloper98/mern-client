import React, { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/http";
import PostCard from "./post-card";

const FETCH_POSTS_URL = "http://localhost:5000/posts/";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { request } = useHttp();

  const fetchPosts = useCallback(async () => {
    const posts = await request(FETCH_POSTS_URL, "GET", null);
    setPosts(posts);
  }, [request]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
