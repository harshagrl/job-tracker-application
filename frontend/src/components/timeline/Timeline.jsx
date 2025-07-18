import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

const Timeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return <p className="text-gray-500 text-sm">No timeline entries yet.</p>;
  }

  return (
    <div className="relative pl-6 border-l-2 border-gray-200">
      {timeline.map((entry, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="absolute -left-3 mt-1 flex items-center justify-center w-6 h-6 bg-primary-500 rounded-full text-white">
            <FaCheckCircle className="text-xs" />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-800 text-base">
              {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
            </p>
            <p className="text-gray-600 text-sm flex items-center mt-1">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              {new Date(entry.changedAt).toLocaleDateString()} at{" "}
              {new Date(entry.changedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
