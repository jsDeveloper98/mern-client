import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/http";
import PostForm from "./post-form";

const CREATE_POST_URL = "http://localhost:5000/posts/create";

const CreatePost = () => {
  const { request, error, success, clearError, clearSuccess } = useHttp();
  const [state, setState] = useState({
    imgUrl: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        clearSuccess();
      }, 2000);
    }
  }, [success, clearSuccess]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearError();
      }, 2000);
    }
  }, [error, clearError]);

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

  const getMessage = () => {
    if (error) {
      return {
        variant: "danger",
        message: "Post is not valid",
      };
    } else if (success) {
      return {
        variant: "success",
        message: success,
      };
    } else {
      return null;
    }
  };

  return (
    <div className="form-container">
      <PostForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        imgUrl={state.imgUrl}
        title={state.title}
        description={state.description}
        getMessage={getMessage}
      />
    </div>
  );
};

export default CreatePost;
