import PropTypes from 'prop-types';

export const BlogCard = ({ authorName, title, content, publishedDate }) => {
  return (
    <div className="border border-slate-200 pb-4">
      <div className="flex">
        <div className="flex justify-center flex-col">
           <Avatar name={authorName} />
        </div>
        <div className="font-extralight pl-2">{authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
            <Circle />
        </div>
        <div className="pl-2 font-thin text-slate-500">
           {publishedDate}
        </div>
      </div>
      <div className="text-xl font-semibold">
        {title}
      </div>
      <div className="text-md font-thin">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="text-slate-500 text-sm font-thin">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  authorName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
};

function Circle () {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

function Avatar({ name }) {
  return (
    <div className="relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-400 rounded-full">
      <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};
