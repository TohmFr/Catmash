import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
//import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Cats';
import ReactSVG from 'react-svg'
import CatSvg from './static/cat.svg';
import './static/Home.css';


const svgStyle = {
    width: '0',
    height: '0'
};

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
            <React.Fragment>
                {this.renderCats(this.props)}
            </React.Fragment>
            
        );
    }


    //Render part
    renderCats(props) {
        const cats = props.cats;
        return (
            <section className="catsVotesWrapper">
                {cats.map(cat =>
                    <div className="catVotePart" key={cat.id}>
                        <div onClick={(e) => this.vote(cat, cats, e)} className="cat">
                            <img src={cat.urlImage} alt="cat pic" />
                        </div>
                    </div>
                )}
            </section>
        );
    }


    //Vote for a cat
    async vote(winner, cats, e) {
        //winnig cat
        const winnerId = winner.id;

        //losing cat
        const losingId = this.props.cats.find(c => c.id !== winnerId).id;

        //vote
        const vote = this.props.requestCatsVote(winnerId, losingId);

        //todo:animation
        

        await vote;

        this.props.requestRandomCats();
    }
}




export default connect(
    state => state.cats,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);

