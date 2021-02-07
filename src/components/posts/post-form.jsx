import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { postCategories } from "../../services/post-service";
import PostCard from "./post-card";

const PostForm = ({
  handleChange,
  handleSubmit,
  handleSelect,
  title,
  description,
  imgUrl,
  category,
  getMessage,
}) => {
  const [imgIsValid, setImgIsValid] = useState(false);

  const disabled = () => {
    return (
      (!imgIsValid ||
        !(title || "").trim() ||
        !(description || "").trim() ||
        !category) &&
      "-disabled"
    );
  };

  const onload = (e) => {
    setImgIsValid(true);
  };

  const onerror = () => {
    setImgIsValid(false);
  };

  const errorMessage = () => {
    if (getMessage()) {
      return (
        <Alert variant={getMessage().variant}>{getMessage().message}</Alert>
      );
    } else if (imgUrl && !imgIsValid) {
      return <Alert variant={"danger"}>Image is not valid</Alert>;
    }
    return null;
  };

  return (
    <div className="post-form">
      <PostCard
        post={{ title, description, imgUrl }}
        hideBtn={true}
        onload={onload}
        onerror={onerror}
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

        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={category ? category : "Choose Category"}
        >
          {postCategories.map((category, i) => (
            <Dropdown.Item onSelect={() => handleSelect(category)} key={i}>
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>

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
