import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../../api';
import { Redirect } from 'react-router';

const TripCreate = (props) => {

  const [startDateTime, setStartDateTime] = useState(null);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [intermediaries, setIntermediaries] = useState([]);

  const createTrip = async (payload) => {
    let response;
    try {
      response = await API.post('trip/add', payload);
      if (response.status === 200) {
        const newTripId = response.data?.id;
        props.history.push('/trip/' + newTripId);
      }
    } catch(err) {
      console.log(err);
    }
  };
  
  const handleSubmit = () => {
    // handle create
    const payload = {
      source,
      destination,
      price: parseInt(price, 10),
      start_at: startDateTime,
      intermediary: [...intermediaries]
    };
    createTrip(payload);
    clearAllState();
  };

  const addEmptyIntermediaries = () => {
    setIntermediaries([...intermediaries, { place: '', start_at: '' }]);
  };

  const handleStagePlace = (e, index) => {
    console.log(e.target.value, index)
    setIntermediaries(intermediaries.map((item, i) => (i === index) ? { place: e.target.value, start_at: item.start_at } : item));
  };

  const handleStageDate = (newDate, index) => {
    setIntermediaries(intermediaries.map((item, i) => (i === index) ? { place: item.place, start_at: newDate } : item));
  };

  const handleClearStage = (stageIndex) => {
    setIntermediaries(intermediaries.filter((item, i) => (i !== stageIndex)));
  }

  const clearAllState = () => {
    setSource('');
    setDestination('');
    setIntermediaries([]);
    setStartDateTime(null);
    setPrice('');
  };

  return (JSON.parse(localStorage.getItem('user'))?.userType === 'PROVIDER') ? (
    <Col>
      <h3>New Trip</h3>
      <hr/>
      <Row>
        <Col>
          <Card className="mb-3">
            <Card.Body>
            <Form>
              <Form.Group as={Row} controlId="source">
                <Form.Label column sm="2">
                  Source
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="destination">
                <Form.Label column sm="2">
                  Destination
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="price">
                <Form.Label column sm="2">
                  Cost per share
                </Form.Label>
                <Col sm="10">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Price"
                      aria-label="Price"
                      aria-describedby="basic-addon1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="startat">
                <Form.Label column sm="2">
                  Start At
                </Form.Label>
                <Col sm="10">
                  <DateTimePicker
                    onChange={setStartDateTime}
                    value={startDateTime}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="startat">
                <Form.Label column sm="2">
                  Add Stages
                </Form.Label>
                <Col sm="10">
                  {intermediaries.map((item, index) => (
                    <Row className="mb-2">
                      <Col md={6}>
                        <Form.Control
                          type="text"
                          placeholder="Stage"
                          value={item.place}
                          md={6}
                          onChange={(e) => handleStagePlace(e, index)}
                        />
                      </Col>
                      <Col md={4} className="z-top">
                        <DateTimePicker
                          onChange={(newDate) => handleStageDate(newDate, index)}
                          value={item.start_at}
                          className="full-width-height z-top"
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="light"
                          className="float-right"
                          onClick={() => handleClearStage(index)}
                        >
                            <FontAwesomeIcon icon={faTrash} className="light-icon" />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="secondary" onClick={addEmptyIntermediaries}>Add Stage</Button>
                </Col>
              </Form.Group>
            </Form>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className="float-right" onClick={handleSubmit}>Create</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Col>
  ) : <Redirect to="/trips" />;
};

export default TripCreate;
