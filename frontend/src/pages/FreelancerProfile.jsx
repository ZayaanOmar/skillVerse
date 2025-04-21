import React from 'react';
import './FreelancerProfile.css';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const FreelancerProfile = () => {
  const freelancer = {
    name: "Tazeem Tayob",
    gender: "Male",
    skills: ["Web Development", "React.js", "Node.js", "MongoDB"],
    rating: 4.8,
    location: "Polokwane, South Africa",
    completedProjects: 12,
    about: "I'm a passionate full-stack developer with experience in modern web technologies.",
    hourlyRate: "$30/hr",
    email: "ahmed@example.com",
    role: "Freelancer",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    occupation: "Software Engineer",
  };

  return (
    <main className="freelancer-profile">
        <Navbar />
        <section className="body" style={{ backgroundColor: '#AFEEEE', minHeight: "100vh" }}>
        <Container className="mt-5">
  <Row className="d-flex justify-content-start">
    {/* Card 1 */}
    <Col md={6} className="col-1">
      <Card className="profile-card border-white">
        <Card.Body>
          <Row className="profile-image d-flex justify-content-center align-items-center">
            <img
              src={freelancer.profilePic}
              alt="ProfilePic"
              className="profile-pic"
              width="70"
              height="70"
            />
          </Row>
          <Row className="profile-name-row">
            <h3 className="profile-name">{freelancer.name}</h3>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Email:</strong> {freelancer.email}</p>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Location:</strong> {freelancer.location}</p>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Gender:</strong> {freelancer.gender}</p>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Role:</strong> {freelancer.role}</p>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Occupation:</strong> {freelancer.occupation}</p>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Rating:</strong> {freelancer.rating} / 5</p>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info">
              <strong>Skills:</strong>
              {freelancer.skills.map((skill, idx) => (
                <Badge key={idx} bg="black" className="mx-1 profile-badge">{skill}</Badge>
              ))}
            </p>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>About:</strong> {freelancer.about}</p>
          </Row>
          <Row className="edit-btn-row">
            <button className="edit-btn">Edit Profile</button>
          </Row>
        </Card.Body>
      </Card>
    </Col>

    {/* Cards 2,3,4 */}
    <Col md={6} className="col-2">
      {/* Card 2 - Projects Card */}
      <Card className="additional-card border-white">
        <Card.Body>
          <Row className="profile-name-row">
            <h3 className="profile-name">My Projects</h3>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Details:</strong> Additional details for the second card.</p>
          </Row>
        </Card.Body>
      </Card>

      {/* Card 3 - Payment Card */}
      <Card className="additional-card border-white">
        <Card.Body>
          <Row className="profile-name-row">
            <h3 className="profile-name">Payment Information</h3>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Details:</strong> Additional details for the third card.</p>
          </Row>
        </Card.Body>
      </Card>

      {/* Card 4 - Reviews Card */}
      <Card className="additional-card border-white">
        <Card.Body>
          <Row className="profile-name-row">
            <h3 className="profile-name">My Reviews</h3>
          </Row>
          <Row className="profile-info-row">
            <p className="profile-info"><strong>Details:</strong> Additional details for the fourth card.</p>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
    </section>
    </main>
  );
};

export default FreelancerProfile;
