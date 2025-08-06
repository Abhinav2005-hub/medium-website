import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner.jsx";
import { Appbar } from "../components/Appbar.jsx";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
     return <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
           <div className="flex justify-center">
              <Spinner />
           </div>
        </div>
     </div>;
  }

  return <FullBlog blog={blog} />;
};
