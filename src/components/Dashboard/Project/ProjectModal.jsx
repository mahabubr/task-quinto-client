import { useState, useEffect } from "react";
import Select from "react-select";
import Modal from "../../../shared/Modal";

const ProjectModal = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);

  // Fetch teams from API
  useEffect(() => {
    if (!isOpen) return;

    const fetchTeams = async () => {
      setLoadingTeams(true);
      setGlobalError(""); // reset global error
      try {
        const user = localStorage.getItem("user");

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/team?user_id=${user}`
        );
        if (!response.ok) throw new Error("Failed to fetch teams");

        const data = await response.json();

        const options = data.data.map((team) => ({
          value: team.id,
          label: team.name,
        }));
        setTeams(options);
      } catch (err) {
        console.error(err.message);
        setGlobalError("Unable to load teams. Please try again.");
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchTeams();
  }, [isOpen]);

  const handleSave = async () => {
    const errors = {};
    if (!projectName.trim()) errors.projectName = "Project name is required";
    if (!selectedTeam) errors.selectedTeam = "Please select a team";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setFieldErrors({});
    setGlobalError("");

    const user = localStorage.getItem("user");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/project`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: projectName,
            team_id: selectedTeam.value,
            user_id: user ? Number(user) : 0,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create project");
      }

      setProjectName("");
      setSelectedTeam(null);
      onClose();
      window.location.reload();
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Project"
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
      {globalError && (
        <p className="text-red-500 text-sm mb-2">{globalError}</p>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            fieldErrors.projectName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter project name"
          disabled={loading}
        />
        {fieldErrors.projectName && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.projectName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Select Team</label>
        <Select
          options={teams}
          value={selectedTeam}
          onChange={setSelectedTeam}
          isLoading={loadingTeams}
          placeholder={loadingTeams ? "Loading teams..." : "Select a team"}
          isDisabled={loading || loadingTeams}
          className={fieldErrors.selectedTeam ? "border-red-500" : ""}
        />
        {fieldErrors.selectedTeam && (
          <p className="text-red-500 text-sm mt-1">
            {fieldErrors.selectedTeam}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ProjectModal;
