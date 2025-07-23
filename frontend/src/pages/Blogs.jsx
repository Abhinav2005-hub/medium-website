import { BlogCard } from "./components/BlogCard.jsx";
import { Appbar } from "./components/Appbar";

export const Blogs = () => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
        <div className="max-w-xl">
            <BlogCard
                 authorName={"Abhinav Saini"}
                 title={"How an ugly single page website maeks $5000 a month without affiliate marketing"}
                 content={"How an ugly single page website maeks $5000 a month without affiliate marketing How an ugly single page website maeks $5000 a month without affiliate marketing"}
                 publishedDate={"22nd July 2025"}
            />
             <BlogCard
                 authorName={"Abhinav Saini"}
                 title={"How an ugly single page website maeks $5000 a month without affiliate marketing"}
                 content={"How an ugly single page website maeks $5000 a month without affiliate marketing How an ugly single page website maeks $5000 a month without affiliate marketing"}
                 publishedDate={"22nd July 2025"}
            />
             <BlogCard
                 authorName={"Abhinav Saini"}
                 title={"How an ugly single page website maeks $5000 a month without affiliate marketing"}
                 content={"How an ugly single page website maeks $5000 a month without affiliate marketing How an ugly single page website maeks $5000 a month without affiliate marketing"}
                 publishedDate={"22nd July 2025"}
            />
        </div>
        </div>
    </div>
}   