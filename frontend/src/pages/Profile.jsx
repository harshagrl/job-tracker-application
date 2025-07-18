import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data.data);
        setEditedUsername(res.data.data.username);
        setEditedEmail(res.data.data.email);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to fetch profile data.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/updatedetails`,
        { username: editedUsername, email: editedEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.data);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
      setError(
        err.response?.data?.error ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setEditedUsername(user.username);
      setEditedEmail(user.email);
    }
    setError("");
    setSuccessMessage("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading profile...
      </div>
    );
  if (error && !user)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-danger-500">
        {error}
      </div>
    );
  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        No user data found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              User Profile
            </h1>

            {successMessage && (
              <div
                className="bg-primary-100 border border-primary-500 text-primary-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
            {error && (
              <div
                className="bg-red-100 border border-danger-500 text-danger-500 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Username:</span>{" "}
                    {user.username}
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                </>
              )}
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Member Since:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              {isEditing ? (
                <>
                  <button
                    className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
