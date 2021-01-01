import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import useHttp from "../../hooks/http";
import PostCard from "./post-card";
import { ArrowLeft } from "react-bootstrap-icons";

const FIND_POST_URL = "http://localhost:5000/posts/find";

const PostDetails = () => {
  const { request } = useHttp();
  const { pathname } = useLocation();
  const [post, setPost] = useState({});

  const postId = pathname.split("/")[2];

  const findPost = useCallback(async () => {
    setPost(await request(FIND_POST_URL, "POST", { id: postId }));
  }, [postId, request]);

  useEffect(() => {
    findPost();
  }, [findPost]);

  return (
    <div className="post-details">
      <Link to="/posts">
        <Button variant="primary">
          <ArrowLeft size={17} /> Back to the List
        </Button>
      </Link>
      <PostCard hideBtn={true} post={post} />
    </div>
  );
};

export default PostDetails;
