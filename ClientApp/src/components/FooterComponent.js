import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Route, withRouter } from 'react-router-dom';
import './static/Footer.css';
import logo from './static/logo-catmash-100px.png';

class FooterComponent extends React.Component {
    constructor(props) {
        super(props);

        
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={() =>this.renderGoAnotherPage('/rank')} />
                <Route path="/rank" render={() =>  this.renderGoAnotherPage('/') } />
            </React.Fragment>                     
        );
    }

    renderGoAnotherPage(path) {
        let text = '';
        if (path === '/') {
            text = 'Retour au vote';
        }
        else {
            text = 'Voir les resultats';
        }
        return (
            <footer onClick={(e) => this.goAnotherPage(path)}>
                <span>{text}</span>
            </footer>
        );
    }

    goAnotherPage(path) {
        this.props.history.push(path);
    }

}

export default withRouter(FooterComponent);