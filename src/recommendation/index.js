// ----------- MOVIES RECOMMENDATION MAIN COMPONENT  ---------

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/styles';
import Heading from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import CancelIcon from './assets/cancel.png';
import OkIcon from './assets/checked.png';

import StyledButton from './styledButton';
import Movie from './movie';

import { getAllMovies, accept_rejectMovie } from './duck/operations';

// ----- style -----

const styles = {
    Container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        ['@media (max-width : 768px)']:{
            height: '100%'
        }
    },
    Heading: {
        width: '60vw',
        textAlign: 'center',
        color: 'rgb(193, 0, 0)',
        fontSize: '2.3vw',
        position: 'absolute',
        top: 0,
        left: '20vw',
        fontWeight: 'bold',
        backgroundColor: 'rgba(25,25,26,0.9)',
        borderBottomLeftRadius: '2vw',
        borderBottomRightRadius: '2vw',
        fontFamily: 'Indie Flower, cursive',
        borderBottom: '0.05vw solid white',
        ['@media (max-width : 768px)']: {
            fontSize: '20px',
            width: '100%',
            left: 0,
        }
    },
    Above:{
        zIndex: 2
    },
    ButtonsDiv:{
        position: 'absolute',
        bottom: '1vh',
        left: 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    Background:{
        height: '120vh',
        width: '105%',
        ["-webkit-filter"]: 'blur(10px)',
        position: 'absolute',
        zIndex: 1,
    }
}


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
        const {classes} = this.props
        return (
            <Container className={classes.Container} maxWidth={false}>
                <img  className={classes.Background} src={this.props.currentItem ? this.props.currentItem.imageURL : 'none'} alt='background' />
                {
                    this.state.wait // loading
                        ?
                        'loading ...'
                        :
                        <div className={classes.Above}  >
                            <Heading variant='h2' className={classes.Heading} >{this.props.currentItem.title}</Heading>
                            <Movie />
                            <Container className={classes.ButtonsDiv} maxWidth='xl' >
                                <StyledButton color='rgb(16, 182, 11)' imgURL={OkIcon} click={() => { this.props.accept_rejectMovie({ id: this.props.currentItem.id, action: 'accept' }) }} />
                                <StyledButton color='rgb(193, 0, 0)' imgURL={CancelIcon} click={() => { this.props.accept_rejectMovie({ id: this.props.currentItem.id, action: 'reject' }) }} />
                            </Container>

                        </div>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RecommendationContainer));