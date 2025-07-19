import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center relative z-10">
      <Link to="/dashboard" className="text-2xl font-bold text-primary-700">
        JobTracker
      </Link>
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-2"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <nav className="hidden md:block">
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
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-primary-500 transition-colors py-2 px-4 w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block text-gray-700 hover:text-primary-500 transition-colors py-2 px-4 w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-danger-500 text-white rounded-md hover:bg-danger-700 transition-colors w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
