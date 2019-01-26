import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Cats';


class Home extends Component {
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
       // this.ensureDataFetched();
    }

    ensureDataFetched() {
        this.props.requestRandomCats();
    }

    render() {
        return (
            <div>
                <h1>CatsVote</h1>
                {renderCats(this.props)}

            </div>
        );
    }
}


function renderCats(props) {
    return (
        <ul>
            {props.cats.map(cat =>
                <li key={cat.key}>
                    <img src={cat.urlImage} alt="cat pic" />
                </li>
            )}
        </ul>
    );
}

export default connect(
    state => state.cats,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);

