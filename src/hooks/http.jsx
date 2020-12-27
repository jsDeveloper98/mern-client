import { useCallback, useState } from "react";
import { isEmpty } from "lodash";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const request = useCallback(async (url, method = "GET", body = {}) => {
    setLoading(true);

    if (!isEmpty(body)) {
      body = JSON.stringify(body);
    }

    const res = await fetch(url, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      return setError(data.message);
    }

    setSuccess(data.message);

    return data;
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearSuccess = useCallback(() => setSuccess(null), []);

  return { request, loading, error, success, clearError, clearSuccess };
};

export default useHttp;
