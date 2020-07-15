import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SideMenu = (props) => {
  return (
    <ListGroup as="ul">
      <ListGroup.Item action onClick={() => props.history.push('/trips')}>
        All Trips
      </ListGroup.Item>
      <ListGroup.Item action onClick={() => props.history.push('/requests')}>My Requests</ListGroup.Item>
      <ListGroup.Item action onClick={() => props.history.push('/profile')}>
        Profile
      </ListGroup.Item>
      <ListGroup.Item action onClick={() => props.history.push('/logout')}>Sign out</ListGroup.Item>
    </ListGroup>
  )
};

export default SideMenu;
