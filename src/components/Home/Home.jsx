import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-900">Task Quinto</div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
              >
                Start free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                <span className="text-sm font-medium text-blue-600">
                  10,000+ teams trust us
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
                  Organize your work,
                  <br />
                  <span className="text-blue-600">simplify your life</span>
                </h1>

                <p className="text-lg text-gray-500 max-w-lg">
                  TaskFlow helps you manage tasks, track progress, and
                  collaborate with your team — all in one place.
                </p>
              </div>

              {/* CTA Form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap">
                  Start for free
                </button>
              </div>
              <p className="text-sm text-gray-400">
                No credit card required • Free 14-day trial
              </p>

              {/* Social Proof */}
              <div className="pt-4">
                <p className="text-sm text-gray-400 mb-3">
                  Trusted by teams at
                </p>
                <div className="flex items-center gap-6 text-gray-300">
                  <span className="text-lg font-medium">Linear</span>
                  <span className="text-lg font-medium">Vercel</span>
                  <span className="text-lg font-medium">Arc</span>
                  <span className="text-lg font-medium">Raycast</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              {/* Simple decoration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-purple-50 rounded-2xl -rotate-3"></div>

              {/* Image container */}
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                  src="/hero.png"
                  alt="TaskFlow dashboard interface"
                  className="w-full h-auto"
                />

                {/* Simple stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">85% tasks completed</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      +23% this week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Feature Ticker */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <span>✓ Task management</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>✓ Team collaboration</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>✓ Progress tracking</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>✓ File sharing</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
