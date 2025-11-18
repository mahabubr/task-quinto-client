import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 max-w-6xl mx-auto">
        {/* Text Section */}
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Organize Your Tasks Effortlessly
          </h1>
          <p className="text-gray-600 mt-4">
            Stay productive and keep everything in one place. Manage your tasks,
            deadlines, and workflow with ease.
          </p>

          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            <Link to={"/login"}>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
            <Link to={"signup"}>
              <button className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-100 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-10 md:mb-0">
          <img
            src="/hero.png"
            alt="Task Manager Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
