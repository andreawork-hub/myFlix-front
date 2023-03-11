import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button, Card, ListGroup, Form } from "react-bootstrap";

export const ProfileView = ({ user, token, onDelete }) => {
  const [updateUser, setUpdateUser] = useState(false);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const birthdayInputRef = useRef(null);

  useEffect(() => {
    if (birthdayInputRef.current) {
      birthdayInputRef.current.value = formatDate(birthday);
    }
  }, [updateUser]);

  const handleUpdate = async () => {
    event.preventDefault();

    const userData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
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
      const data = await response.json();
      console.log(data);
      if (data) {
        alert("The profile information was updated.");
        setUpdateUser(false);
        window.location.reload();
      } else {
        console.error(data);
        alert("Profile update failed, try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = () => {
    fetch(`https://movie-api-lnmw.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Your profile was successfully deleted.");
          localStorage.clear();
          window.location.reload();
        } else {
          alert("Something went wrong, please try again.");
        }
      })
      .catch((error) => console.log(error));
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
            <Card className="bg-dark border-0">
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }} className="mb-3">
                  User Information
                </Card.Title>
                <ListGroup className="text-start">
                  <ListGroup.Item className="text-bg-dark mb-3">
                    Username: {username}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-bg-dark mb-3">
                    Password: **********
                  </ListGroup.Item>

                  <ListGroup.Item className="text-bg-dark mb-3">
                    Email: {email}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-bg-dark mb-3">
                    Birthday: {formatDate(birthday)}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Body>
                <div className="text-left">
                  <Button variant="danger" onClick={() => setUpdateUser(true)}>
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
            <Card className="bg-dark border-0">
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }} className="mb-3">
                  Profile Information
                </Card.Title>
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
                  <div className="text-center">
                    <Button
                      variant="danger"
                      type="submit"
                      style={{ alignItems: "flex-end", float: "left" }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => handleDeleteUser(user._id)}
                      variant="danger"
                      style={{ alignItems: "flex-end", float: "center" }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => setUpdateUser(false)}
                      variant="danger"
                      style={{
                        alignItems: "flex-end",
                        float: "right",
                      }}
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
