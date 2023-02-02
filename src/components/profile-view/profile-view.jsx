import React, { useEffect, useState } from "react";
import { UserInfo } from "./user-info";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

export const ProfileView = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      Username: username,
      Email: email,
      Password: password,
    };

    fetch(`https://movie-api-lnmw.onrender.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${storedToken}` },
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.newUser) {
          localStorage.setItem("user", JSON.stringify(data.newUser));
          alert("Update successful");
          setUser(data.newUser);
        } else {
          alert("Unable to update your information");
        }
      })
      .catch((e) => console.log(e));
  };

  handleDelete = () => {
    fetch(`https://movie-api-lnmw.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${storedToken}` },
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Your account has been deleted");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.reload();
        } else alert("Unable to delete your information");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Col>
        <Card className="bg-dark border-0" style={{ marginTop: 75 }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              User Information
            </Card.Title>
            <Card.Text>
              <UserInfo username={user.Username} email={user.Email} />
              <Button
                variant="danger"
                type="delete"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="bg-dark border-0" style={{ marginTop: 75 }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              Update Profile
            </Card.Title>
            <Form onSubmit={(e) => handleUpdate(e)}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                  minlenght="3"
                  placeholder="Username"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  placeholder="Email"
                />
              </Form.Group>
              <Button variant="danger" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
