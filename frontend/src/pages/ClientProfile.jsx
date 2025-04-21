import React from 'react';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';

const ClientProfile = () => {
  const client = {
    name: "Sarah Dlamini",
    company: "BrightTech Ltd",
    email: "sarah@brighttech.com",
    location: "Cape Town, South Africa",
    activeProjects: 3,
    totalSpent: "$12,000",
    bio: "Entrepreneur and startup founder with a passion for innovation.",
    recentProjects: ["Landing Page Design", "Mobile App Backend", "SEO Optimization"]
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Row>
            <Col md={4}>
              <img
                src="https://via.placeholder.com/150"
                alt="Client"
                className="img-fluid rounded-circle"
              />
            </Col>
            <Col md={8}>
              <h3>{client.name}</h3>
              <p>{client.bio}</p>
              <p><strong>Company:</strong> {client.company}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Location:</strong> {client.location}</p>
              <p><strong>Active Projects:</strong> {client.activeProjects}</p>
              <p><strong>Total Spent:</strong> {client.totalSpent}</p>
              <h5 className="mt-4">Recent Projects</h5>
              <ListGroup>
                {client.recentProjects.map((project, idx) => (
                  <ListGroup.Item key={idx}>{project}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClientProfile;
