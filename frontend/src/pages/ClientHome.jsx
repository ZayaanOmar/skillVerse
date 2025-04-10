import React from 'react';

const ClientHome = () => {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="max-w-5xl mx-auto">
        {/* Welcome Banner */}
        <header className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h1 className="text-2xl font-bold text-gray-800">testing this is client homepage</h1>
          <p className="text-gray-600 mt-2">Here’s a quick overview of your account.</p>
        </header>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700">
            search for a service
          </button>
          <button className="bg-green-600 text-white p-4 rounded-xl shadow hover:bg-green-700">
            View Proposals
          </button>
        </section>

        {/* Recent Activity Placeholder */}
        <article className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recent Jobs</h2>
          <p className="text-gray-500">No jobs posted yet. Get started by posting one!</p>
        </article>
      </section>
    </main>
  );
};

export default ClientHome;
