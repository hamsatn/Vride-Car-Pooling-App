import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import API from '../../api';

const Requests = (props) => {

  const [allRequests, setAllRequests] = useState([]);

  const getAllRequests = async () => {
    let response;
    try {
      response = await API.get('approval/list');
      if (response.status === 200) {
        setAllRequests(response.data)
      }
    } catch(err) {
      console.log(err);
    }
  };

  const handleApproval = async (id) => {
    let response;
    try {
      response = await API.post('approval/' + id + '/approve');
      if (response.status === 200) {
        getAllRequests();
      }
    } catch(err) {
      console.log(err);
    }
  };

  const renderStatusButton = (request) => {
    if (JSON.parse(localStorage.getItem('user'))?.userType === 'RIDER') {
      return request?.approved ? 'Approved' : 'Unapproved';
    } else {
      return request?.approved ? '' : <Button variant="success" onClick={() => handleApproval(request.id)}>Approve</Button>
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  return (
    <Col>
      <h3>My Requests ({allRequests.length})</h3>
      <hr/>
      <Row>
        <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Start At</th>
              <th>Price ($)</th>
              <th>Status</th>
              <th>Trip Details</th>
            </tr>
          </thead>
          <tbody>
            {
              allRequests?.map((request, index) => {
                return (
                  <tr>
                    <td>{`${index + 1}`}</td>
                    <td>{request?.trip?.source}</td>
                    <td>{request?.trip?.destination}</td>
                    <td><Moment format="DD MMMM, YYYY HH:mm A">{request?.trip?.start_at}</Moment></td>
                    <td>{request?.trip?.price}</td>
                    <td>{renderStatusButton(request)}</td>
                    <td><Button variant="link" onClick={() => props.history.push('/trip/' + request?.trip?.id)}>View Trip</Button></td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        </Col>
      </Row>
    </Col>
    );
};

export default Requests;
