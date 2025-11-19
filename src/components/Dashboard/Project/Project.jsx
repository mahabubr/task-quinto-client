import { useEffect, useState } from "react";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";

const ProjectTask = () => {
  const [projects, setProjects] = useState([]);
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const user = localStorage.getItem("user");

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/project?user_id=${user}`
        ); // Adjust API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProjects(data.data); // assuming API returns { data: [...] }
      } catch (error) {
        console.error(error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-500 mt-1">
            Manage your projects and task here
          </p>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          onClick={() => setProjectsModalOpen(true)}
        >
          Create Team
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-gray-400 text-xl">No projects found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} projectData={project} />
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={projectsModalOpen}
        onClose={() => setProjectsModalOpen(false)}
      />
    </div>
  );
};

export default ProjectTask;
