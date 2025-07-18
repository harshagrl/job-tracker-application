const StatusFilter = ({ filter, setFilter }) => {
  const statuses = ["all", "applied", "interview", "offer", "rejected"];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${
              filter === status
                ? "bg-primary-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
