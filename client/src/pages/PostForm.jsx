import { useState } from "react";
import { postService } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    featuredImage: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      await postService.createPost(formData);
      navigate("/");
    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Input
        placeholder="Excerpt"
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <Input
        type="file"
        onChange={(e) => setForm({ ...form, featuredImage: e.target.files[0] })}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default PostForm;
