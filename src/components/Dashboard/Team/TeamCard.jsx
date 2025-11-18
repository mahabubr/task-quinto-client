import { useState } from "react";
import MemberModal from "./MemberModal";
import { UserIcon } from "@heroicons/react/24/solid";

const TeamCard = ({ teamData }) => {
  const [team, _] = useState(teamData);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl">
      {/* Card Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{team.name}</h2>
        <p className="text-gray-500 mt-1">{team.description}</p>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-gray-700 font-medium mb-2">
            Members ({team.members.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {team.members.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
              >
                <UserIcon className="h-4 w-4 text-gray-500" />
                <span>{m.name}</span>
                <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                  {m.role} ({m.capacity})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Add Member Button */}
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
            onClick={() => setMemberModalOpen(true)}
          >
            Add Member
          </button>
        </div>
      </div>

      {/* Member Modal */}
      <MemberModal
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        teamId={team.id}
      />
    </div>
  );
};

export default TeamCard;
