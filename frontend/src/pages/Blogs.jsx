import { BlogCard } from "../components/BlogCard.jsx";
import { Appbar } from "../components/Appbar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config.js";
import { BlogSkeleton } from "../components/BlogSkeleton.jsx"

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs(response.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();  
  }, []);

  if (loading) {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    </div>
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full">
         <div className="max-w-xl">
           {Array.isArray(blogs) && blogs.length > 0 ? (
             blogs.map((blog) => (
               <BlogCard
                 key={blog.id}
                 id={blog.id}
                 authorName={blog.author?.name || "Anonymous"}
                 title={blog.title}
                 content={blog.content}
                 publishedDate={"2nd Feb 2024"}
                />
              ))
            ) : (
              <div>No blogs found.</div>
            )}
          </div>
      </div>
    </div>
  );
};
