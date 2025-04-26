import React from "react";
import "./ViewFreelancers.css"; // Importing CSS style file
import { Card, Button, Badge } from "react-bootstrap";
import { FaStar, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Navbar";

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

const ViewFreelancers = () => {
  return (
    <main className="main">
      <Navbar /> {/* This puts the navbar at the top */}
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
  );
};

export default ViewFreelancers;
