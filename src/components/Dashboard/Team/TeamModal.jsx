import { useState } from "react";
import Modal from "../../../shared/Modal";

const TeamModal = ({ isOpen, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState(""); // optional
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    setLoading(true);
    setError("");

    const user = localStorage.getItem("user");

    try {
      // API call to create team
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/team`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: teamName,
            description,
            user_id: user ? Number(user) : 0,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create team");
      }

      setTeamName("");
      setDescription(""); // reset description
      onClose();

      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Team"
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
            {loading ? "Saving..." : "Save"}
          </button>
        </>
      }
    >
      {/* Team Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Team Name</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter team name"
          disabled={loading}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Optional Description */}
      <div className="mb-4">
        <label className="block text-gray-700">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          placeholder="Enter a brief description"
          disabled={loading}
        />
      </div>
    </Modal>
  );
};

export default TeamModal;
