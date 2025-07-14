// This component renders a list of PostCard components for each post passed in as props.
import PostCard from "./PostCard";

function PostList({ posts }) {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
// This component renders a list of PostCard components for each post passed in as props.