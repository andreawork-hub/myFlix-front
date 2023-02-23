import React from "react";
import { Card, Form, Button } from "react-bootstrap";

export const UpdateForm = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const storedToken = localStorage.getItem("token");
  //const storedUser = localStorage.getItem("user");
  const [token] = useState(storedToken ? storedToken : null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    console.log(data);

    const updateUser = await fetch(
      `https://movie-api-lnmw.onrender.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await updateUser.json();
    console.log(response);
    if (response) {
      alert("Your information is updated. Please log in again");
      localStorage.clear();
    } else {
      alert("Something went wrong, please try again.");
    }
  };

  const handleDeregister = () => {
    fetch(`https://movie-api-lnmw.onrender.com/users/${user.Username}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Your account was successfully deleted.");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong, please try again.");
      }
    });
  };

  return (
    <Card className="bg-dark border-0" style={{ marginTop: 75 }}>
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          Edit Profile Information
        </Card.Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBirthday" className="mb-3">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Save Changes
          </Button>
        </Form>
        <Button
          onClick={() => handleDeregister(user._id)}
          variant="danger"
          type="submit"
        >
          Delete Account
        </Button>
      </Card.Body>
    </Card>
  );
};
