import React, { useState } from "react";
import useHttp from "../../hooks/http";
import PostForm from "./post-form";

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
      imgUrl: "",
      title: "",
      description: "",
    });
  };

  return (
    <div className="form-container">
      <PostForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        imgUrl={state.imgUrl}
        title={state.title}
        description={state.description}
      />
    </div>
  );
};

export default CreatePost;
