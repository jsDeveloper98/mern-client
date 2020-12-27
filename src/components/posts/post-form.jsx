import React from "react";
import { Form, Button } from "react-bootstrap";

const PostForm = ({
  handleChange,
  handleSubmit,
  title,
  description,
  imgUrl,
}) => {
  return (
    <Form>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="Enter title"
          onChange={handleChange}
          name="title"
          value={title}
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Control
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={description}
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group controlId="formBasicImageUrl">
        <Form.Control
          type="text"
          placeholder="Image Url"
          onChange={handleChange}
          name="imgUrl"
          value={imgUrl}
          autoComplete="off"
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Create Post
      </Button>
    </Form>
  );
};

export default PostForm;
