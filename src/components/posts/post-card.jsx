import React from "react";
import { Button, Card } from "react-bootstrap";

const PostCard = ({ post, hideBtn, onload, setImgIsValid }) => {
  return (
    <div className="post-card">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={post.imgUrl}
          onLoad={onload}
          onError={() => setImgIsValid(false)}
        />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
          {!hideBtn && <Button variant="primary">Go somewhere</Button>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostCard;
