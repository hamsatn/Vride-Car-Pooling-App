import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import API from '../../api';

const TripList = (props) => {

  const [allTrips, setAllTrips] = useState([]);

  const getAllTrips = async () => {
    let response;
    try {
      response = await API.get('trip/list');
      if (response?.status === 200) {
        setAllTrips(response.data.reverse());
      } 
    } catch(err) {
      console.log(err);
    } 
  };

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <Col>
      <h3>All Trips ({allTrips.length})</h3>
      <hr/>
      <Row>
        <Col>
          {
            allTrips.map(trip => (
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{trip.source} <span className="text-muted font-weight-light">to</span> {trip.destination}</Card.Title>
                  <Card.Text>
                    <div className="pt-1"><FontAwesomeIcon icon={faClock} className="light-icon" /> Starts on <Moment format="DD MMMM, YYYY @ hh:mm A">{trip.start_at}</Moment> from source</div>
                    <div className="pt-1 pb-0 m-0">
                      <FontAwesomeIcon icon={faUser} className="light-icon" /> {trip.noOfConfirmedRiders !== 0 ? trip.noOfConfirmedRiders : 'No'} people pooling</div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted font-weight-bold price-trip-card">{`$${trip.price}`}</small>
                  <Button variant="primary" className="float-right" onClick={() => props.history.push('/trip/' + trip.id)}>View details</Button>
                </Card.Footer>
              </Card>
            ))
          }
        </Col>
      </Row>
    </Col>
  );
};

export default TripList;
