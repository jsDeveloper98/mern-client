import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import useHttp from "../hooks/http";

const FETCH_POSTS_URL = "http://localhost:5000/posts/";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { request } = useHttp();

  const fetchPosts = useCallback(async () => {
    const posts = await request(FETCH_POSTS_URL, "GET", null);
    setPosts(posts);
    console.log({ posts });
  }, [request]);

  useEffect(() => {
    fetchPosts();
  }, [request, fetchPosts]);

  return (
    <>
      {posts.map((post) => (
        <Card key={post._id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={post.imgUrl} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Posts;
