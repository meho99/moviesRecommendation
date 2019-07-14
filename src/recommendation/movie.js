// ----------  MOVIE COMPONENT  ----------

import React from 'react';
import { connect } from 'react-redux';
import { accept_rejectMovie } from './duck/operations';
import styled from 'styled-components';


// ----- style -----

const Container = styled.div`
    width: 50vw;
    background-color:#191919;
    display: flex;
    flex-direction: row;
    border-radius: 2vw;
`
const Cover = styled.img`
    width: 50%;
    max-height: 70vh;
    border-radius: 2vw 0 0 2vw;
`
const RightDiv = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Info = styled.p`
    font-size: 1.5vw;
    margin-bottom: 3vw;
    margin-top: 1vw;
    text-align:center;
    color: ${props=> props.title? '#C10000' : 'white'};
    font-weight: ${props=> props.title? 'bold' : 'none'};
    font-style: ${props=> props.title? 'italic' : 'none'} ;
`

// ----- component -----

const Movie = props => {
    return (
        <Container>
            <Cover src={props.currentItem.imageURL} alt='cover'/>
            <RightDiv>
                <Info title >{props.currentItem.title}</Info>
                <Info>Rating: {props.currentItem.rating}</Info>
                <Info>Summary: {props.currentItem.summary}</Info>
            </RightDiv>
        </Container>
    );
};


const mapStateToProps = state => ({
    currentItem: state.list[state.actualItem]
})

const mapDispatchToProps = dispatch => ({

    accept_rejectMovie: action => dispatch(accept_rejectMovie(action))
})

export default connect(mapStateToProps, mapDispatchToProps)(Movie);