import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SideMenuProvider = (props) => {
  return (
    <ListGroup as="ul">
      <ListGroup.Item action onClick={() => props.history.push('/trip/create')}>
        New Trip
      </ListGroup.Item>
      <ListGroup.Item action onClick={() => props.history.push('/trips')}>Trips</ListGroup.Item>
      <ListGroup.Item action onClick={() => props.history.push('/requests')}>Incoming Requests</ListGroup.Item>
      <ListGroup.Item action onClick={() => props.history.push('/profile')}>
        Profile
      </ListGroup.Item>
      <ListGroup.Item action onClick={() => props.history.push('/logout')}>Sign out</ListGroup.Item>
    </ListGroup>
  )
};

export default SideMenuProvider;
