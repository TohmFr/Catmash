import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './static/Header.css';
import logo from './static/logo-catmash-100px.png';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="headerWrapper">
                <header  >
                    <img src={logo} alt="CatMash logo" onClick={(e) => this.goHome()}  />
                    <h1>Cat Mash</h1>
                </header>
            </div>
        );
    }

    goHome() {
        this.props.history.push('/');
    }

}

export default withRouter(HeaderComponent);