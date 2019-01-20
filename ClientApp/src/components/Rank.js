import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Cats';

class Rank extends Component {
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        this.ensureDataFetched();
    }

    ensureDataFetched() {

        const page = parseInt(this.props.match.params.page, 10) || 0;
        
        this.props.requestCatsRank(page);
    }

    render() {
        return (
            <div>
                <h1>CatsRank</h1>
                {renderCatsRank(this.props)}

            </div>
        );
    }
}
//   
function renderCatsRank(props) {    
    console.log(props);
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
)(Rank);
