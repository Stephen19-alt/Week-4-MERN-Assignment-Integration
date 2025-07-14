import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Register from "@/pages/Register";
import Login from "@/pages/Login"; // if using
import PostDetail from "@/pages/PostDetail";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:idOrSlug" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
