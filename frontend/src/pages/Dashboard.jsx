import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import JobForm from "../components/jobs/JobForm";
import JobList from "../components/jobs/JobList";
import StatusFilter from "../components/jobs/StatusFilter";
import { FaSearch, FaSortAlphaDown } from "react-icons/fa";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAtDesc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchJobs();
  }, [navigate]);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${jobId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobs(jobs.map((job) => (job._id === jobId ? res.data.data : job)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResumeUploadSuccess = (jobId, resumeInfo) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, resume: resumeInfo } : job
      )
    );
  };

  const filteredAndSortedJobs = useMemo(() => {
    let currentJobs = jobs;

    if (filter !== "all") {
      currentJobs = currentJobs.filter((job) => job.status === filter);
    }

    if (searchTerm) {
      currentJobs = currentJobs.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    currentJobs.sort((a, b) => {
      if (sortBy === "createdAtDesc") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "createdAtAsc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "companyAsc") {
        return a.company.localeCompare(b.company);
      } else if (sortBy === "roleAsc") {
        return a.role.localeCompare(b.role);
      }
      return 0;
    });

    return currentJobs;
  }, [jobs, filter, searchTerm, sortBy]);

  const jobCounts = useMemo(() => {
    const counts = {
      all: jobs.length,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };
    jobs.forEach((job) => {
      counts[job.status]++;
    });
    return counts;
  }, [jobs]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading your job applications...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Job Application Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(jobCounts).map(([status, count]) => (
                <div
                  key={status}
                  className={`p-4 rounded-lg shadow-md text-center cursor-pointer transition-all ${
                    filter === status
                      ? "bg-primary-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setFilter(status)}
                >
                  <p className="text-sm font-medium uppercase">{status}</p>
                  <p className="text-3xl font-bold mt-1">{count}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <JobForm setJobs={setJobs} />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch mb-6 gap-4">
              <StatusFilter filter={filter} setFilter={setFilter} />

              <div className="relative w-full sm:w-auto flex-grow flex items-center h-full">
                <input
                  type="text"
                  placeholder="Search by company or role..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary-500 focus:border-primary-500 h-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative w-full sm:w-auto flex items-center h-full">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md h-full"
                >
                  <option value="createdAtDesc">Newest First</option>
                  <option value="createdAtAsc">Oldest First</option>
                  <option value="companyAsc">Company (A-Z)</option>
                  <option value="roleAsc">Role (A-Z)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaSortAlphaDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <JobList
              jobs={filteredAndSortedJobs}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onResumeUploadSuccess={handleResumeUploadSuccess}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
