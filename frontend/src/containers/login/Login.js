import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import API from '../../api';

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    let response;
    try {
      response = await API.post('authenticate', { username, password }, false);
      if (response.status === 200 && response?.data?.token) {
        setUsername('');
        setPassword('');
        localStorage.setItem('token', response.data?.token);
        localStorage.setItem('user', JSON.stringify(response.data?.user));
        props.history.push('/trips');
      } else {
        setErrorMsg('Authentication failed');
      }
    } catch (err) {
      setErrorMsg('Authentication failed');
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center vertical-center">
        <Col md={4}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <span className="text-danger float-right pt-2">{errorMsg}</span>
              <h3>Sign In</h3>
              <Form onSubmit={handleLogin}>
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
                <Button variant="primary" type="submit" className="float-right" onClick={handleLogin}>
                  Sign In
                </Button>
                
                <span className="float-left pt-2">Don't have an account? <Link to="/register">Sign Up</Link></span>
                
              </Form>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
