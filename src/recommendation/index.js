// ----------- MOVIES RECOMMENDATION MAIN COMPONENT  ---------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CancelIcon from './assets/cancel.png';
import OkIcon from './assets/checked.png';

import StyledButton from './styledButton';
import Movie from './movie';

import { getAllMovies, accept_rejectMovie } from './duck/operations';

// ----- style -----

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    @media (max-width : 768px){
        height: 100%;
    }
`
const Background = styled.img`
    height: 120vh;
    width: 105%;
    -webkit-filter:blur(10px);
    position: absolute;
    z-index: 1;
`
const Above = styled.div`
    z-index: 2;
`
const Buttons = styled.div`
    position: absolute;
    bottom: 1vh;
    left: 0;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

`
const Heading = styled.h2`
    width: 60vw;
    text-align: center;
    color: rgb(193, 0, 0);
    font-size: 2.3vw;
    position: absolute;
    top: 0;
    left: 20vw;
    font-weight: bold;
    background-color: rgba(25,25,26,0.9);
    border-bottom-left-radius: 2vw;
    border-bottom-right-radius: 2vw;
    border-bottom: 0.05vw solid white;
    @media (max-width : 768px){
        font-size: 20px;
        width: 100%;
        left: 0;
    }
`

// ----- component -----


class RecommendationContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wait: true,
        }
    }
    componentDidMount = async () => {

        // ----- fetch data from server -----

        await this.props.fetchData();

        this.setState({ wait: false })

    }

    render() {
        return (
            <Container>
                <Background src={this.props.currentItem ? this.props.currentItem.imageURL : 'none'} alt='background' />
                {
                    this.state.wait
                        ?
                        'loading ...'
                        :
                        <Above>
                            <Heading>{this.props.currentItem.title}</Heading>
                            <Movie />
                            <Buttons>
                                <StyledButton color='rgb(193, 0, 0)' imgURL={CancelIcon} click={() => { this.props.accept_rejectMovie({ id: this.props.currentItem.id, action: 'reject' }) }} />
                                <StyledButton color='rgb(16, 182, 11)' imgURL={OkIcon} click={() => { this.props.accept_rejectMovie({ id: this.props.currentItem.id, action: 'accept' }) }} />
                            </Buttons>

                        </Above>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    currentItem: state.list[state.actualItem]
})

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(getAllMovies()),
    accept_rejectMovie: action => dispatch(accept_rejectMovie(action))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationContainer);