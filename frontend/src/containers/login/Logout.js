import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return  <Redirect to='/login'/>;
};

export default Logout;