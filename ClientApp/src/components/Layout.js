import React from 'react';
import { Container } from 'reactstrap';
//import NavMenu from './NavMenu';
import HeaderComponent from './HeaderComponent';

import './static/Layout.css';

export default props => (
  <div >
    <HeaderComponent />
    <Container>
      {props.children}
    </Container>
  </div>
);
