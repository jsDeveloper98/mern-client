import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostCard = ({ post, hideBtn, onload, onerror }) => {
  return (
    <>
      {post ? (
        <div className="post-card">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={post.imgUrl}
              onLoad={onload}
              onError={onerror}
            />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description}</Card.Text>
              {!hideBtn && (
                <Link to={"/posts/" + post._id}>
                  <Button variant="primary">Open Post</Button>
                </Link>
              )}
            </Card.Body>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default PostCard;
