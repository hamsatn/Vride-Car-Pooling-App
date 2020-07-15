import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../../api';

const Register = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('RIDER');
  const [errorMsg, setErrorMsg] = useState('');

  const registerUser = async (payload) => {
    let response;
    try {
      response = await API.post('register', payload, false);
      if (response.status === 200) {
        props.history.push('/login');
      }
      setErrorMsg('Something went wrong');
    } catch(err) {
      console.log(err);
      setErrorMsg('Something went wrong');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let errorFlag = false;
    if (password !== confirmPassword || password.length < 6) {
      setErrorMsg('Password mismatch or violates password policy');
      errorFlag = true;
    }
    if (username.length < 5) {
      setErrorMsg('Username should at least be 5 character long');
      errorFlag = true;
    }
    if (!errorFlag)
      registerUser({ username, password, userType });
  };

  return (
    <Container fluid>
      <Row className="justify-content-center vertical-center">
        <Col md={4}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <span className="text-danger float-right pt-2">{errorMsg}</span>
              <h3>Sign Up</h3>
              <Form onSubmit={handleRegister}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <Form.Text className="text-muted">
                    Enter your employee ID as your username.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicReenterPassword">
                  <Form.Label>Re-enter Password</Form.Label>
                  <Form.Control type="password" placeholder="Re-enter Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formRegisterAs">
                  <Form.Label>Register as...</Form.Label>
                  <Form.Control as="select" onChange={(e) => setUserType(e.target.value)} active={userType}>
                    <option value="RIDER">Rider</option>
                    <option value="PROVIDER">Provider</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="float-right" onClick={handleRegister}>
                  Sign Up
                </Button>
                <span className="float-left pt-2">Already have an account? <Link to="/login">Sign In</Link></span>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
