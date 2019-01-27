import React from 'react';
import { Container } from 'reactstrap';
//import NavMenu from './NavMenu';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

import './static/Layout.css';

export default props => (
    <div >
        <HeaderComponent />
        <Container>
            {props.children}
        </Container>
        <FooterComponent />
    </div>
);
