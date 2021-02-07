import React, { useEffect, useState } from "react";
import useIsMounted from "react-is-mounted-hook";
import useHttp from "../../hooks/http";
import { CREATE_POST_URL } from "../../http-urls";
import PostForm from "./post-form";

const CreatePost = () => {
  const isMounted = useIsMounted();
  const { request, error, success, clearError, clearSuccess } = useHttp();
  const [state, setState] = useState({
    imgUrl: "",
    title: "",
    description: "",
    category: null,
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

    if (isMounted()) {
      setState({
        ...state,
        imgUrl: "",
        title: "",
        description: "",
      });
    }
  };

  const handleSelect = (category) => {
    setState({ ...state, category });
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
        handleSelect={handleSelect}
        imgUrl={state.imgUrl}
        title={state.title}
        description={state.description}
        category={state.category}
        getMessage={getMessage}
      />
    </div>
  );
};

export default CreatePost;
