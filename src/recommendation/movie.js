// ----------  MOVIE COMPONENT  ----------

import React from 'react';
import { connect } from 'react-redux';
import { accept_rejectMovie } from './duck/operations';
import styled from 'styled-components';

// ----- style -----

const Container = styled.div`
    width: 50vw;
    max-width: 80vh;
    background-color:#191919;
    display: flex;
    flex-direction: row;
    border-radius: 2vw;
    position: relative;
    left: calc(${props => props.margin}px - 50vw);
    cursor: pointer;
    @media(max-width: 768px){
        min-width: 40vh;
    }
`
const Cover = styled.img`
    width: 50%;
    height: 100%;
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
    color: ${props => props.title ? '#C10000' : 'white'};
    font-weight: ${props => props.title ? 'bold' : 'none'};
    font-style: ${props => props.title ? 'italic' : 'none'} ;
    @media(max-width: 768px){
        font-size: 13px;
    }
`

// ----- component -----

class Movie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: window.innerWidth / 2,
            swipe: false
        }
    }

    // ---------- swipe listeners ----------

    _onTouchStart = (e) => {
        this.setState({ swipe: true });
    }
    // ----- moblie move  -----
    _onTouchMove = (e) => {
        if (e.changedTouches[0].pageX > window.innerWidth / 2 && this.state.swipe )
            this.setState({ position: e.changedTouches[0].pageX });
    }
    // ----- desktop move -----
    _onMouseMove = (e) => {
        e.preventDefault()
        if (e.clientX > window.innerWidth / 2 && this.state.swipe)
            this.setState({ position: e.clientX -10 });
    }
    _onTouchEnd = (e) => {
        if (this.state.position > window.innerWidth * 3 / 4)
            this.props.accept_rejectMovie({ id: this.props.currentItem.id, action: 'reject' })
        this.setState({ position: window.innerWidth / 2, swipe: false });
    }
    render() {
        return (
            <div
                // ----- moblie -----

                onTouchStart={this._onTouchStart}
                onTouchMove={this._onTouchMove}
                onTouchEnd={this._onTouchEnd}

                // ----- desktop -----

                onMouseDown={this._onTouchStart}
                onMouseMove={this._onMouseMove}
                onMouseUp={this._onTouchEnd}
            >
                <Container margin={this.state.position}>
                    <Cover src={this.props.currentItem.imageURL} alt='cover' />
                    <RightDiv>
                        <Info title={1} >{this.props.currentItem.title}</Info>
                        <Info>Rating: {this.props.currentItem.rating}</Info>
                        <Info>Summary: {this.props.currentItem.summary}</Info>
                    </RightDiv>
                </Container>
            </div>

        );
    }
};


const mapStateToProps = state => ({
    currentItem: state.list[state.actualItem]
})

const mapDispatchToProps = dispatch => ({

    accept_rejectMovie: action => dispatch(accept_rejectMovie(action))
})

export default connect(mapStateToProps, mapDispatchToProps)(Movie);