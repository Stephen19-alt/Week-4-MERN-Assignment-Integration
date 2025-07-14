// This component allows users to add comments to a post and displays existing comments.
import { useState } from "react";
import { postService } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CommentSection({ comments = [], postId, onCommentAdded }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await postService.addComment(postId, { content: comment });
      setComment("");
      onCommentAdded(); // Trigger re-fetch in parent
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comments</h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <Button type="submit">Post</Button>
      </form>

      <div className="space-y-2">
        {comments.length === 0 && <p className="text-sm text-gray-500">No comments yet.</p>}
        {comments.map((c, idx) => (
          <div
            key={idx}
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm"
          >
            <p>{c.content}</p>
            <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
// This component allows users to add comments to a post and displays existing comments.