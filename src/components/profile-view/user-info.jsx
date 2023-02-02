import React from "react";
import { Col } from "react-bootstrap";

export const UserInfo = ({ username, email }) => {
  return (
    <>
      <Col className="mb-3">
        <span>Username: {username}</span>
      </Col>
      <Col className="mb-3">
        <span>Email: {email}</span>
      </Col>
    </>
  );
};
