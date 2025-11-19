import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FiUsers, FiClipboard, FiLayers, FiClock } from "react-icons/fi";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/dashboard?user_id=${user}`
      );
      const json = await res.json();
      setData(json.data);
    };

    fetchData();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-sm">
        Loading...
      </div>
    );

  const { totals, teamSummary, recentReassignments } = data;

  // ---------------------------
  // 📌 Team Workload Bar Chart
  // ---------------------------
  const workloadSeries = [
    { name: "Tasks", data: teamSummary.map((m) => m.currentTasks) },
  ];

  const workloadOptions = {
    chart: { id: "team-load", toolbar: { show: false } },
    xaxis: { categories: teamSummary.map((m) => m.name) },
    colors: ["#4f46e5"],
    dataLabels: { enabled: true },
  };

  // ---------------------------
  // 📌 Team Capacity Comparison Chart
  // ---------------------------
  const capacitySeries = [
    {
      name: "Current Tasks",
      data: teamSummary.map((t) => t.currentTasks),
    },
    {
      name: "Capacity",
      data: teamSummary.map((t) => t.capacity),
    },
  ];

  const capacityOptions = {
    chart: { type: "bar", stacked: false, toolbar: { show: false } },
    colors: ["#f97316", "#16a34a"],
    plotOptions: { bar: { horizontal: true } },
    xaxis: { categories: teamSummary.map((t) => t.name) },
  };

  // ---------------------------
  // 📌 Task Status Donut Chart
  // ---------------------------
  const statusCount = {
    pending: recentReassignments.filter((t) => t.status === "pending").length,
    progress: recentReassignments.filter((t) => t.status === "in_progress")
      .length,
    done: recentReassignments.filter((t) => t.status === "done").length,
  };

  const donutSeries = [
    statusCount.pending,
    statusCount.progress,
    statusCount.done,
  ];

  const donutOptions = {
    labels: ["Pending", "In Progress", "Done"],
    colors: ["#fbbf24", "#3b82f6", "#10b981"],
    legend: { show: true, position: "bottom" },
  };

  // ---------------------------
  // 📌 Fake Project Trend Sparkline (optional)
  // ---------------------------
  const sparklineOptions = {
    chart: { type: "area", sparkline: { enabled: true } },
    stroke: { curve: "smooth" },
    colors: ["#6366f1"],
  };

  const sparklineSeries = [
    {
      name: "Projects",
      data: [2, 4, 3, 6, 5, 8, totals.totalProjects],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* --- Stats Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card
          title="Total Projects"
          value={totals.totalProjects}
          icon={<FiLayers size={26} />}
          color="from-indigo-500 to-violet-500"
        />

        <Card
          title="Total Tasks"
          value={totals.totalTasks}
          icon={<FiClipboard size={26} />}
          color="from-emerald-500 to-lime-500"
        />

        <Card
          title="Teams"
          value={totals.totalTeams.length}
          icon={<FiUsers size={26} />}
          color="from-orange-500 to-amber-500"
        />

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-600 text-sm mb-1">Project Trend</h2>
          <ReactApexChart
            options={sparklineOptions}
            series={sparklineSeries}
            type="area"
            height={80}
          />
        </div>
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Workload Chart */}
        <div className="bg-white p-6 rounded-xl shadow-xl xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Team Workload</h2>
          <ReactApexChart
            options={workloadOptions}
            series={workloadSeries}
            type="bar"
            height={320}
          />

          {/* Capacity Status */}
          <h3 className="text-lg font-semibold mt-6 mb-2">Capacity Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamSummary.map((member) => (
              <div
                key={member.id}
                className={`p-4 rounded-lg border ${
                  member.overloaded
                    ? "bg-red-50 border-red-300"
                    : "bg-green-50 border-green-300"
                }`}
              >
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-600">
                  {member.currentTasks}/{member.capacity} tasks
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Donut + Capacity Chart */}
        <div className="space-y-6">
          {/* Donut */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Task Status</h2>
            <ReactApexChart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              height={260}
            />
          </div>

          {/* Horizontal Capacity */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Capacity Comparison</h2>
            <ReactApexChart
              options={capacityOptions}
              series={capacitySeries}
              type="bar"
              height={250}
            />
          </div>
        </div>
      </div>

      {/* --- Recent Reassignments --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Reassignments</h2>

        <ul className="space-y-3">
          {recentReassignments.length === 0 && (
            <p className="text-gray-500 text-sm">No recent activity</p>
          )}

          {recentReassignments.map((item) => (
            <li
              key={item.id}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <p className="font-medium text-gray-700">{item.name}</p>

              <div className="flex gap-2 mt-1">
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                  {item.status}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">
                  Project {item.project_id}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Reusable Stats Card component
const Card = ({ title, value, icon, color }) => (
  <div
    className={`bg-linear-to-r ${color} text-white p-6 rounded-xl shadow-lg flex items-center gap-4`}
  >
    <div className="bg-white/20 p-3 rounded-lg">{icon}</div>
    <div>
      <h2 className="text-sm opacity-80">{title}</h2>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  </div>
);

export default Dashboard;
