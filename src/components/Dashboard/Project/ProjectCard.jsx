import { useState } from "react";
import { UserIcon, UserGroupIcon, PlusIcon } from "@heroicons/react/24/solid";
import TaskModal from "./TaskModal";

const ProjectCard = ({ projectData }) => {
  const [project] = useState(projectData);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">{project.name}</h2>
        <p className="text-gray-600 mt-1">
          Owner:{" "}
          <span className="font-medium">
            {project.user.first_name} {project.user.last_name}
          </span>
        </p>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-6">
        {/* Team Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Team Details
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Team Name:</span>
              <span className="text-gray-700">{project.team.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Team Owner ID:</span>
              <span className="text-gray-700">{project.team.user_id}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Created At:</span>
              <span className="text-gray-700">
                {new Date(project.team.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Tasks ({project.task.length})
          </h3>

          {project.task.length === 0 ? (
            <p className="text-gray-500 italic">No tasks yet.</p>
          ) : (
            <div className="space-y-4">
              {project.task.map((t) => (
                <div
                  key={t.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
                >
                  {/* Task title and status */}
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {t.name}
                    </h4>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium
                          ${
                            t.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : t.status === "in_progress"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-green-200 text-green-800"
                          }
                        `}
                    >
                      {t.status.replace("_", " ")}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-3">{t.description}</p>

                  {/* Priority */}
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Priority:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                          ${
                            t.priority === "high"
                              ? "bg-red-200 text-red-700"
                              : t.priority === "medium"
                              ? "bg-orange-200 text-orange-700"
                              : "bg-green-200 text-green-700"
                          }
                        `}
                    >
                      {t.priority}
                    </span>
                  </p>

                  {/* Members */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <strong className="text-sm text-gray-700">Members:</strong>

                    {t.members.length === 0 ? (
                      <span className="text-gray-500 italic">Unassigned</span>
                    ) : (
                      t.members.map((m) => (
                        <span
                          key={m.id}
                          className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full font-medium flex items-center gap-1"
                        >
                          <UserIcon className="h-3 w-3" />
                          {m.name}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
            onClick={() => setTaskModalOpen(true)}
          >
            <PlusIcon className="h-5 w-5" /> Add Task
          </button>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        projectId={project.id}
        members={project.team.members}
      />
    </div>
  );
};

export default ProjectCard;
