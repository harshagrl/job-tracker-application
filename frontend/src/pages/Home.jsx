import { Link } from "react-router-dom";
import { FaBriefcase, FaChartLine, FaCheckCircle } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex flex-col items-center justify-center text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-down">
          Track Your Job Applications with Ease
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fade-in-up">
          Never lose sight of your career progress. Manage applications,
          interviews, and offers all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200">
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-primary-500 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-full shadow-lg hover:bg-white hover:text-secondary-500 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
          <div className="bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
            <FaBriefcase className="text-4xl text-primary-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">
              Organize Applications
            </h3>
            <p className="text-gray-600">
              Keep track of every job you apply for, with all details in one
              place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
            <FaChartLine className="text-4xl text-primary-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Monitor Progress</h3>
            <p className="text-gray-600">
              View the status of your applications at a glance with a clear
              timeline.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
            <FaCheckCircle className="text-4xl text-primary-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Never Miss a Step</h3>
            <p className="text-gray-600">
              Get a comprehensive overview of your job search journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
