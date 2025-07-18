import { Link, useNavigate } from "react-router-dom";
import jobtrackerIcon from "../../../public/jobtracker_icon.gif";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center font-mono">
      <Link
        to="/dashboard"
        className="flex items-center text-4xl font-bold text-primary-500"
      >
        <img
          src={jobtrackerIcon}
          alt="JobTracker Icon"
          className="w-10 h-10 mr-3"
        />
        JobTracker
      </Link>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-danger-500 text-white rounded-md hover:bg-danger-700 transition-colors"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
