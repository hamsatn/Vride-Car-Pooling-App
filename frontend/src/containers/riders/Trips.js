import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SideMenu from './SideMenu';
import TripList from './TripList';

const Trips = () => {
  return (
    <Row>
      <Col md={3}>
        <SideMenu/>
      </Col>
      <TripList />
    </Row>
  )
};

export default Trips;
