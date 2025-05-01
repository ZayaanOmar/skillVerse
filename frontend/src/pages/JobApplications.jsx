import React, { useEffect, useState } from "react";
import "./JobApplications.css"; // Importing CSS style file
import { Card, Button, Badge } from "react-bootstrap";
import { FaStar, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/api";

const ViewFreelancers = () => {
  const { jobId } = useParams(); // Get the jobId from the URL parameters
  console.log("Job ID:", jobId); // Log the jobId for debugging
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/applications/jobs/${jobId}`
        );
        setApplications(response.data);
        console.log("Applications:", response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleAccept = async (applicationId) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/applications/jobs/accept/${applicationId}`,
        {},
        { withCredentials: true }
      );
      alert("Application Accepted"); // Show success message
    } catch (error) {
      console.error("Error accepting application:", error);
      alert("Error accepting application"); // Show error message
    }
  };

  return (
    <main>
      <section>
        {applications.length === 0 ? (
          <p>No Current Applications</p>
        ) : (
          <section>
            {applications.map((application) => (
              <article key={application._id}>
                <p>
                  <strong>Freelancer: </strong>
                  {application.freelancerId.username}
                </p>
                <p>
                  <strong>Price: </strong>${application.price}
                </p>
                {application.coverLetter && (
                  <p>
                    <strong>Cover Letter: </strong>
                    {application.coverLetter}
                  </p>
                )}
                <button onClick={() => handleAccept(application._id)}>
                  Accept Application
                </button>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
};

export default ViewFreelancers;

/* Tazeem's boilerplate code 
const freelancers = [
  {
    id: 1,
    name: "Amina Khumalo",
    title: "Web Developer",
    location: "Johannesburg, SA",
    rating: 4.8,
    reviews: 34,
    description:
      "Experienced full-stack developer specializing in React and Node.js. Clean code, fast delivery.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Tebogo Sithole",
    title: "UI/UX Designer",
    location: "Cape Town, SA",
    rating: 4.5,
    reviews: 21,
    description:
      "Creative UI/UX designer with a keen eye for minimal and functional design.",
    skills: ["Figma", "Adobe XD", "HTML/CSS"],
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Tebogo Sithole",
    title: "UI/UX Designer",
    location: "Cape Town, SA",
    rating: 4.5,
    reviews: 21,
    description:
      "Creative UI/UX designer with a keen eye for minimal and functional design.",
    skills: ["Figma", "Adobe XD", "HTML/CSS"],
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  // Add more freelancers here...
];

const FreelancerCard = ({ freelancer }) => (
  <Card className="mb-4 shadow-sm freelancer-card">
    <Card.Body>
      <section className="d-flex align-items-center">
        <img
          src={freelancer.avatar}
          alt={freelancer.name}
          className="rounded-circle me-3"
          width="70"
          height="70"
        />
        <section>
          <h5 className="mb-0">{freelancer.name}</h5>
          <small className="text-muted">{freelancer.title}</small>
          <section className="text-warning mt-1">
            {Array(Math.floor(freelancer.rating))
              .fill()
              .map((_, i) => (
                <FaStar key={i} />
              ))}
            <span className="text-dark ms-2">
              {freelancer.rating} ({freelancer.reviews} reviews)
            </span>
          </section>
        </section>
      </section>
      <Card.Text className="mt-3">{freelancer.description}</Card.Text>
      <section className="mb-2">
        <FaMapMarkerAlt className="me-1 text-secondary" />
        <small className="text-muted">{freelancer.location}</small>
      </section>
      <section className="mb-3">
        {freelancer.skills.map((skill, idx) => (
          <Badge bg="light" text="dark" className="me-1 mb-1" key={idx}>
            {skill}
          </Badge>
        ))}
      </section>
      <section className="d-flex justify-content-between">
        <Button variant="success">Hire</Button>
        <Button variant="outline-secondary">
          <FaEnvelope className="me-2" />
          Message
        </Button>
      </section>
    </Card.Body>
  </Card>
);

<main className="main">
      <Navbar /> 
      <section className="container py-4">
        <h2 className="mb-4">Freelancers Who Applied</h2>
        <section className="row">
          {freelancers.map((freelancer) => (
            <section className="col-md-6" key={freelancer.id}>
              <FreelancerCard freelancer={freelancer} />
            </section>
          ))}
        </section>
      </section>
    </main>
*/
