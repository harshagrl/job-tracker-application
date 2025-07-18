import JobCard from "./JobCard";

const JobList = ({ jobs, onStatusChange, onDelete, onResumeUploadSuccess }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg mb-2">No job applications found.</p>
        <p>Add a new job using the form above!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onResumeUploadSuccess={onResumeUploadSuccess}
        />
      ))}
    </div>
  );
};

export default JobList;
