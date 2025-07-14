// This component fetches and displays a single post by its ID or slug.
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postService } from "@/services/api";
import CommentSection from "@/components/Post/CommentSection";

function PostDetail() {
  const { idOrSlug } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    const data = await postService.getPost(idOrSlug);
    setPost(data);
  };

  useEffect(() => {
    fetchPost();
  }, [idOrSlug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <CommentSection
        comments={post.comments}
        postId={post._id}
        onCommentAdded={fetchPost}
      />
    </div>
  );
}

export default PostDetail;
// This component fetches and displays a single post by its ID or slug.