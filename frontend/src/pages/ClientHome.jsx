import React from 'react';
import './ClientHome.css';//importing css style file
const ClientHome = () => {
  return (
    <main className="client-home">
      <section className="max-w-5xl mx-auto">
        {/* Welcome Banner */}
        <header className="welcome-banner mb-6">
          <h1 className="heading1">testing this is client homepage</h1>
          <p className="description">Here’s a quick overview of your account.</p>
        </header>

        {/* Quick Actions */}
        <section className="section1">
          <button className="button1">
            search for a service
          </button>
          <button className="button2">
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
