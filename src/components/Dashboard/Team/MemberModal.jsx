import React, { useState } from "react";
import Modal from "../../../shared/Modal";

const MemberModal = ({ isOpen, onClose, teamId }) => {
  const [member, setMember] = useState({
    name: "",
    role: "",
    capacity: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSave = async () => {
    const newErrors = {};
    if (!member.name) newErrors.name = "Name is required";
    if (!member.role) newErrors.role = "Role is required";
    if (member.capacity === "" || member.capacity < 0 || member.capacity > 5)
      newErrors.capacity = "Capacity must be between 0 and 5";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/member`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: member.name,
            role: member.role,
            capacity: Number(member.capacity),
            team_id: teamId,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add member");
      }

      // const newMember = await response.json();
      // onSave(newMember);

      setMember({ name: "", role: "", capacity: "" });
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
      title="Add Member"
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
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Member"}
          </button>
        </>
      }
    >
      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={member.name}
          onChange={(e) => setMember({ ...member, name: e.target.value })}
          className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter member name"
          disabled={loading}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <input
          type="text"
          value={member.role}
          onChange={(e) => setMember({ ...member, role: e.target.value })}
          className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter role"
          disabled={loading}
        />
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role}</p>
        )}
      </div>

      {/* Capacity */}
      <div className="mb-4">
        <label className="block text-gray-700">Capacity</label>
        <input
          type="number"
          value={member.capacity}
          min="0"
          max="5"
          onChange={(e) => setMember({ ...member, capacity: e.target.value })}
          className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.capacity ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter capacity (0-5)"
          disabled={loading}
        />
        {errors.capacity && (
          <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
        )}
      </div>

      {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
    </Modal>
  );
};

export default MemberModal;
