import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Sending token:", token);
  
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Blog data:", response.data);
        setBlogs(response.data.blogs || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error.response?.data || error.message);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};


