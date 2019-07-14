// ----------- MOVIES RECOMMENDATION MAIN COMPONENT  ---------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import {getAllMovies} from './duck/operations'

// ----- style -----

const Container =  styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content-center;
    overflow: hidden;
    position: absolute;
`
const Background = styled.img`
    height: 120vh;
    width: 105%;
    -webkit-filter:blur(10px);
    z-index: 1;
`

// ----- component -----


class RecommendationContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            wait: true,
            currentURL: ''
        }
    }
    componentDidMount= async ()=>{

        // ----- fetch data from server -----

        await this.props.fetchData()
        this.setState({wait: false, currentURL:this.props.movies[this.props.currentItem].imageURL })
    }
    render() {
        return (
            <Container>
                <Background src={this.state.currentURL} alt='background'/>
                {
                    this.state.wait
                    ?
                    'loading ...'
                    :
                    'juz nie'
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    movies: state.list,
    currentItem: state.actualItem
})

const mapDispatchToProps= dispatch => ({
    fetchData: () =>  dispatch(getAllMovies())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationContainer);