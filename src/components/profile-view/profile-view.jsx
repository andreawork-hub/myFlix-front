import React, { useEffect, useState, useRef } from "react";
//import { UpdateForm } from "./update-user";
import { Row, Col, Button, Card, ListGroup, Form } from "react-bootstrap";

export const ProfileView = ({ user, token, onDelete }) => {
  const [updateUser, setUpdateUser] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const birthdayInputRef = useRef(null);

  useEffect(() => {
    if (birthdayInputRef.current) {
      birthdayInputRef.current.value = formatDate(birthday);
    }
  }, [updateUser]);

  const handleUpdate = async () => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };
    try {
      const response = await fetch(
        `https://movie-api-lnmw.onrender.com/users/${user.Username}`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { success, message, data } = await response.json();
      if (success) {
        alert(message);
        setUpdateUser(false);
      } else {
        console.error(message);
        alert("Update failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  ////
  ////
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `https://movie-api-lnmw.onrender.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { success, message, data } = await response.json();
      if (success) {
        onDelete();
      } else {
        alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (birthday) => {
    const date = new Date(birthday);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dayOfTheMonth = date.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (dayOfTheMonth < 10) {
      dayOfTheMonth = `0${dayOfTheMonth}`;
    }
    return `${year}-${month}-${dayOfTheMonth}`;
  };

  return (
    <React.Fragment>
      {!updateUser ? (
        <Row>
          <Col>
            <Card className="bg-dark border-0" style={{ marginTop: 75 }}>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  User Information
                </Card.Title>
                <Card.Text></Card.Text>
                <ListGroup className="text-start">
                  <ListGroup.Item className="text-bg-dark">
                    Username: {username}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-bg-dark">
                    Password: **********
                  </ListGroup.Item>

                  <ListGroup.Item className="text-bg-dark">
                    Email: {email}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-bg-dark">
                    Birthday: {formatDate(birthday)}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Body>
                <div className="text-center">
                  <Button variant="primary" onClick={() => setUpdateUser(true)}>
                    EDIT
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card className="bg-dark border-0" style={{ marginTop: 75 }}>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  Profile Information
                </Card.Title>
                <Card.Text></Card.Text>
                <Form onSubmit={handleUpdate}>
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minlenght="3"
                      placeholder="Username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBirthday" className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      autoComplete="date"
                      ref={birthdayInputRef}
                      required
                    />
                  </Form.Group>
                  <div>
                    <Button variant="danger" type="submit">
                      Save
                    </Button>
                    <Button onClick={handleDeleteUser} variant="danger">
                      Delete
                    </Button>
                    <Button
                      onClick={() => setUpdateUser(false)}
                      variant="danger"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};
