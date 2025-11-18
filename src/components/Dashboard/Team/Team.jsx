import { useState, useEffect } from "react";
import TeamCard from "./TeamCard";
import TeamModal from "./TeamModal";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch teams from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/team`
        ); // Adjust API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        const data = await response.json();
        setTeams(data.data); // assuming API returns { data: [...] }
      } catch (error) {
        console.error(error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teams</h1>
          <p className="text-gray-500 mt-1">
            Manage your teams and members here
          </p>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          onClick={() => setTeamModalOpen(true)}
        >
          Create Team
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading teams...</p>
      ) : teams.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-gray-400 text-xl">No teams found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} teamData={team} />
          ))}
        </div>
      )}

      {/* Create Team Modal */}
      <TeamModal
        isOpen={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
      />
    </div>
  );
};

export default Team;
