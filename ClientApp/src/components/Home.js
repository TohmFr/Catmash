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



    //Render
    render() {
        return (
            <div>
                <h1>CatsVote</h1>
                {this.renderCats(this.props)}

            </div>
        );
    }


    //Render part
    renderCats(props) {
        const cats = props.cats;
        return (
            <div>
                {cats.map(cat =>
                    <div key={cat.id} onClick={(e) => this.vote(cat, cats, e)}>
                        <img src={cat.urlImage} alt="cat pic" />
                    </div>
                )}
            </div>
        );
    }


    //Vote for a cat
    vote(winner, cats, e) {
        //winnig cat
        const winnerId = winner.id;

        //losing cat
        const losingId = cats.find(c => c.id !== winnerId).id;

        console.log(winnerId, losingId);

    }
}




export default connect(
    state => state.cats,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);

