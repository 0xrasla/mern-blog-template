import { useEffect, useState } from "react";
import { _axios } from "../lib/axios";

export const useFetchData = (url, method = "GET", requestData = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await _axios({
          url,
          method,
          data: requestData,
        });
        const resData = await res.data;
        setData(resData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [url, method, requestData]);

  return { data, loading, error };
};
