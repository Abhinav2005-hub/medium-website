import { BlogCard } from "../components/BlogCard.jsx";
import { Appbar } from "../components/Appbar.jsx";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="max-w-xl">
                    {Array.isArray(blogs) && blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            authorName={blog.author?.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate || "Unknown Date"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
