import { useState } from "react";
import Modal from "../../../shared/Modal";
import Select from "react-select";

const TaskModal = ({ isOpen, onClose, members, projectId }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assigned_members: [], // ⬅ MULTI SELECT
    priority: { value: "medium", label: "Medium" },
    status: { value: "pending", label: "Pending" },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Members dropdown options
  const memberOptions = members.map((m) => ({
    label: m.name,
    value: m.id,
  }));

  // Priority options
  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  // Status options
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  const handleSave = async () => {
    const newErrors = {};
    if (!task.title) newErrors.title = "Title is required";
    if (!task.description) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/task`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: task.title,
            description: task.description,
            priority: task.priority.value,
            status: task.status.value,
            member_ids: task.assigned_members.map((m) => Number(m.value)),
            project_id: projectId,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add task");
      }

      // Reset form
      setTask({
        title: "",
        description: "",
        assigned_members: [],
        priority: { value: "medium", label: "Medium" },
        status: { value: "pending", label: "Pending" },
      });

      setErrors({});
      onClose();
      window.location.reload();
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Task"
      footer={
        <>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className={`px-4 py-2 rounded text-white transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </>
      }
    >
      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Enter task title"
          disabled={loading}
          className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Enter task description"
          disabled={loading}
          className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Assigned Members MULTI SELECT */}
      <div className="mb-4">
        <label className="block text-gray-700">Assign Members</label>
        <Select
          isMulti
          value={task.assigned_members}
          onChange={(val) => setTask({ ...task, assigned_members: val })}
          options={memberOptions}
          isDisabled={loading}
        />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-gray-700">Priority</label>
        <Select
          value={task.priority}
          onChange={(val) => setTask({ ...task, priority: val })}
          options={priorityOptions}
          isDisabled={loading}
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <Select
          value={task.status}
          onChange={(val) => setTask({ ...task, status: val })}
          options={statusOptions}
          isDisabled={loading}
        />
      </div>

      {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
    </Modal>
  );
};

export default TaskModal;
