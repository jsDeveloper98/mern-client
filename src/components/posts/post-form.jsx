import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import PostCard from "./post-card";

const PostForm = ({
  handleChange,
  handleSubmit,
  title,
  description,
  imgUrl,
  getMessage,
}) => {
  const [imgIsValid, setImgIsValid] = useState(false);

  const disabled = () => {
    return (
      (!imgIsValid || !(title || "").trim() || !(description || "").trim()) &&
      "-disabled"
    );
  };

  const onload = (e) => {
    setImgIsValid(e.target.offsetHeight <= 180);
  };

  const errorMessage = () => {
    if (getMessage()) {
      return (
        <Alert variant={getMessage().variant}>{getMessage().message}</Alert>
      );
    } else if (imgUrl && !imgIsValid) {
      return <Alert variant={"danger"}>Image url is not valid</Alert>;
    }
    return null;
  };

  return (
    <div className="post-form">
      <PostCard
        post={{ title, description, imgUrl }}
        hideBtn={true}
        onload={onload}
        setImgIsValid={setImgIsValid}
      />

      <Form>
        {errorMessage()}

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

        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          className={disabled()}
        >
          Create Post
        </Button>
      </Form>
    </div>
  );
};

export default PostForm;
