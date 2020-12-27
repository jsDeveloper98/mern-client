import React from "react";
import { Button, Card } from "react-bootstrap";

const PostCard = ({ post }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={post.imgUrl} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
