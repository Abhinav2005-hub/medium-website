import { useEffect, useState } from "react";
import axios from "axios";

export const useBlog = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await axios.get(`http://localhost:3000/api/v1/blog?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlog(res.data);
      } catch (e) {
        console.error("Error fetching blog:", e.response?.data || e.message);
        setBlog(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { loading, blog };
};
