import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Profile = (props) => {
  return (
    <Col>
      <h3>Profile</h3>
      <hr/>
      <Row>
        <Col md={2}>
          <div className="profile-avatar">{JSON.parse(localStorage.getItem('user'))?.username[0].toUpperCase()}</div>
        </Col>
        <Col md={2}>
          <h4>@{JSON.parse(localStorage.getItem('user'))?.username}</h4>
          <h6>{JSON.parse(localStorage.getItem('user'))?.userType}</h6>
        </Col>
      </Row>
    </Col>
  );
};

export default Profile;
