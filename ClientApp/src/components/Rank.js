import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Cats';
import './static/Rank.css';

class Rank extends Component {
    componentDidMount() {

        // This method is called when the component is first added to the document
        this.ensureDataFetched();
    }
    componentWillUnmount() {

    }
    componentDidUpdate() {
        // This method is called when the route parameters change
        //this.ensureDataFetched();
    }

    ensureDataFetched() {

        const page = parseInt(this.props.match.params.pageIndex, 10) || -1;
        this.props.requestCatsRank(page);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Top 10</h1>
                {renderCatsRank(this.props)}

            </React.Fragment>
        );
    }

   
}
//   
function renderCatsRank(props) {    
    return (
        
        <ul className="listCat">
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
