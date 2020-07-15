import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import TripDetails from '../containers/riders/TripDetails';
import TripCreate from '../containers/providers/TripCreate';
import SideMenuProvider from '../containers/providers/SideMenuProvider';
import NavBar from '../containers/navigation/NavBar';
import SideMenu from '../containers/riders/SideMenu';
import TripList from '../containers/riders/TripList';
import Requests from '../containers/riders/Requests';
import Profile from '../containers/profile';

const MainLayout = (props) => {

  return (localStorage.getItem('token')) ? (
    <>
    <Container fluid className="p-0">
      <NavBar/>
    </Container>
    <Container className="mt-4 mb-4">
      <Row>
        <Col>
          <Row>
            <Col md={3}>
              { JSON.parse(localStorage.getItem('user'))?.userType === 'RIDER' ? <SideMenu {...props} /> : <SideMenuProvider {...props} /> }
            </Col>
            <Router history={props.history}>
              <Switch>
                <Route path = "/trips" component = {TripList} exact />
                <Route path = "/trip/create" component = {TripCreate} exact />
                <Route path = "/trip/:id" component = {TripDetails} exact />
                <Route path = "/requests" component = {Requests} exact />
                <Route path = "/profile" component = {Profile} exact />
              </Switch>
            </Router>
          </Row>
        </Col>
      </Row>
    </Container>
    <Container fluid className="p-0">
      <div className="footer">
        <Container>
          <p className="text-center">MADE WITH <span className="text-danger">❤</span> BY HAMSA</p>
        </Container>
      </div>
    </Container>
    </>
  ) : <Redirect to="/login" />;
};

export default MainLayout;
