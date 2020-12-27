import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useHttp from "../hooks/http";

const CREATE_POST_URL = "http://localhost:5000/posts/create";

const CreatePost = () => {
  const { request } = useHttp();
  const [state, setState] = useState({
    imgUrl: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await request(CREATE_POST_URL, "POST", { ...state });

    setState({
      email: "",
      password: "",
      imgUrl: "",
    });
  };

  return (
    <div className="auth">
      <Form>
        <Form.Group controlId="formBasicTitle">
          <Form.Control
            type="text"
            placeholder="Enter title"
            onChange={handleChange}
            name="title"
            value={state.title}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={handleChange}
            name="description"
            value={state.description}
          />
        </Form.Group>

        <Form.Group controlId="formBasicImageUrl">
          <Form.Control
            type="text"
            placeholder="Image Url"
            onChange={handleChange}
            name="imgUrl"
            value={state.imgUrl}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreatePost;
