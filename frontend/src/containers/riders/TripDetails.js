import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faCalendar, faUserCog } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import API from '../../api';

const TripDetails = (props) => {

  const [detail, setDetail] = useState({});
  const [userType, setUserType] = useState('RIDER');
  const [allRequests, setAllRequests] = useState([]);
  const [requestButtonStatus, setRequestButtonStatus] = useState('SEND');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getTripDetail = async () => {
    let response;
    try {
      response = await API.get('trip/' + props.match.params.id);
      if (response.status === 200) {
        setDetail(response.data);
      }
    } catch(err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    const filteredRequests = allRequests.find((item) => item.trip?.id == props.match.params.id);
    if (filteredRequests) {
      if (filteredRequests.approved)
        setRequestButtonStatus('APPROVED');
      else
        setRequestButtonStatus('PENDING');
    } else {
      setRequestButtonStatus('SEND');
    }
  }, [allRequests, props.match.params.id]);

  useEffect(() => {
    setUserType(JSON.parse(localStorage.getItem('user'))?.userType);
    getTripDetail();
    getAllRequests();
  }, []);

  const renderButton = () => {
    switch (requestButtonStatus) {
      case 'PENDING':
        return <Button variant="success" disabled className="float-right">Request Sent</Button>
      case 'APPROVED':
        return <Button variant="success" disabled className="float-right">Trip Approved</Button>
      default:
        return <Button variant="success" className="float-right" onClick={() => setIsModalOpen(true)}>Send Request</Button>
    }
  };

  const handlePaymentRequest = async () => {
    let response;
    try {
      response = await API.post('approval/' + props.match.params.id + '/send');
      if (response.status === 200) {
        getAllRequests();
        setIsModalOpen(false);
      }
    } catch(err) {
      console.log(err);
    }
  };

  const renderModal = () => {
    return (
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(!isDeleteModalOpen)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Payment?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you confirm the payment of <strong>${detail.price}</strong>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(!isModalOpen)}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={() => handlePaymentRequest()}>
            Pay & Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    )
  };


  const handleDeleteTrip = async () => {
    let response;
    try {
      response = await API.delete('trip/' + props.match.params.id);
      if (response.status === 200) {
        setIsDeleteModalOpen(false);
        props.history.push('/trips');
      }
    } catch(err) {
      console.log(err);
    }
  };

  const renderDeleteModal = () => {
    return (
      <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you to delete this trip?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
            Dismiss
          </Button>
          <Button variant="danger" onClick={() => handleDeleteTrip()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
  };

  return (
    <Col>
      <h3>{detail.source} <span className="text-muted font-weight-light">to</span> {detail.destination}</h3>
      <hr/>
      <Row>
        <Col md={9}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
                    <p><FontAwesomeIcon icon={faCalendar} className="light-icon" /> &nbsp; <Moment format="DD MMMM, YYYY">{detail.start_at}</Moment></p>
                    <p><FontAwesomeIcon icon={faClock} className="light-icon" /> &nbsp; <Moment format="hh:mm A">{detail.start_at}</Moment></p>
                    <p><FontAwesomeIcon icon={faUser} className="light-icon" /> &nbsp; {detail.noOfConfirmedRiders !== 0 ? detail.noOfConfirmedRiders : 'No'} people pooling</p>
                    <p><FontAwesomeIcon icon={faUserCog} className="light-icon" /> &nbsp; Created by {detail.user?.username}</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted font-weight-bold price-trip-card">{`$${detail.price ? detail.price : 0}`}</small>
              {(userType === 'RIDER') ? renderButton() : null }
              {(userType === 'PROVIDER' && JSON.parse(localStorage.getItem('user'))?.username === detail.user?.username) ? (
                  <Button variant="danger" className="float-right" onClick={() => setIsDeleteModalOpen(true)}>Delete Trip</Button>) : null }
            </Card.Footer>
          </Card>
          {renderModal()}
          {renderDeleteModal()}
        </Col>
        <Col>
          <h4>Timeline...</h4><br/>
          <ul className="pathway">
            <li className="source-dot">{detail.source}</li>
            <li className="idot light"><span className="time-intermediary text-muted"><Moment format="hh:mm A">{detail.start_at}</Moment></span></li>
            <li className="idot light"></li>
            <li className="idot light"></li>
            {
              detail?.intermediary?.map(stage => {
                return (
                  <>
                    <li className="idot">{stage.place}</li>
                    <li className="idot light"><span className="time-intermediary text-muted"><Moment format="hh:mm A">{stage.start_at}</Moment></span></li>
                    <li className="idot light"></li>
                    <li className="idot light"></li>
                  </>
                );
              })
            }
            <li className="destination-dot">{detail.destination}</li>
          </ul>
        </Col>
      </Row>
    </Col>
  );
};

export default TripDetails;
