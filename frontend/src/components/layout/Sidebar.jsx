import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6 hidden md:block">
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/profile"
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaUser className="mr-3" />
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
