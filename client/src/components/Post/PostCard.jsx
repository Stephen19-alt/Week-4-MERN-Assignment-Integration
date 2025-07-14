// This component renders a card for each post with its title, excerpt, and a link to read more.
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PostCard({ post }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link to={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        <Link to={`/posts/${post.slug}`}>
          <Button className="mt-3">Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default PostCard;
// This component renders a card for each post with its title, excerpt, and a link to read more.