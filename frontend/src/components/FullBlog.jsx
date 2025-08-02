import { Appbar } from "./Appbar";
import PropTypes from "prop-types";
import Avatar from "react-avatar"; 

export const FullBlog = ({ blog = {} }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              {blog.title || "Untitled"}
            </div>
            <div className="text-slate-500 pt-2">Posted on 2nd December 2023</div>
            <div className="pt-4">{blog.content || "No content available."}</div>
          </div>
          <div className="col-span-4 pl-4">
            <div className="text-sm text-slate-600 mb-2">
                Author
            </div>
            <div className="flex items-center gap-3">
              <Avatar name={blog.author?.name || "Anonymous"} size="30" round={true} color="grey" />
            <div>
                <div className="text-xl font-bold">
                  {blog.author?.name || "Anonymous"}
                </div>
                <div className="pt-1 text-slate-500 text-sm">
                  Random catch phrase about the author's ability to grab the user's attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FullBlog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

