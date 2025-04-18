import React from "react";
import "./AdminHome.css";

const AdminHome = () => {
  return (
    <>
      <section className="container-fluid">
        <section className="banner">
          <h1 className="banner-title">Admin Dashboard</h1>
          <h2>Manage Your Site</h2>
        </section>

        <section className="container">
          <section class="row">
            <section class="col-4">
              <section className="card">
                <section className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-input-cursor-text"></i>View Support
                    Tickets
                  </h5>
                  <p className="card-text">
                    View and manage user support requests
                  </p>
                  <button className="btn btn-outline-primary">
                    Support Tickets
                  </button>
                </section>
              </section>
            </section>

            <section class="col-4">
              <section className="card">
                <section className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-people"></i>Manage Users
                  </h5>
                  <p className="card-text">View and manage user accounts</p>
                  <button className="btn btn-outline-primary">
                    Manage Accounts
                  </button>
                </section>
              </section>
            </section>

            <section class="col-4">
              <section className="card">
                <section className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-person-workspace"></i>Manage Job
                    Listings
                  </h5>
                  <p className="card-text">View and manage job listings</p>
                  <button className="btn btn-outline-primary">
                    Manage Job Listings
                  </button>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default AdminHome;
