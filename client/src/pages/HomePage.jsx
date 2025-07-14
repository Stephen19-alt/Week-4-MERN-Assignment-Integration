// This component fetches and displays a list of posts on the home page.
import { useEffect, useState } from "react";
import { postService } from "@/services/api";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { posts } = await postService.getAllPosts();
        setPosts(posts);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>

      {loading && <p className="text-gray-500">Loading posts...</p>}

      {error && (
        <p className="text-red-500 font-medium bg-red-50 dark:bg-red-900 p-4 rounded mb-4">
          {error}
        </p>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-500">No posts available.</p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader>
              <CardTitle>
                <Link to={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              <Link to={`/posts/${post.slug}`}>
                <Button className="mt-2">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
// This component fetches and displays a list of posts on the home page.