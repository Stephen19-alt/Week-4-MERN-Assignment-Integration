// This component renders the navigation bar with links to login and register pages.

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary dark:text-white">
        <Link to="/" className="hover:underline">
          MERN Blog
        </Link>
      </h1>

      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
// This component renders the navigation bar with links to login and register pages.
