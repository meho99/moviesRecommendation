// ----------  MOVIE COMPONENT  ----------

import React from 'react';
import { connect } from 'react-redux';
import { accept_rejectMovie } from './duck/operations';

import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

// ----- style -----
const styles = {
    MyContainer: {
        width: '50vw',
        maxWidth: '80vh',
        backgroundColor: '#191919',
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        borderRadius: '2vw',
        position: 'relative',
        cursor: 'pointer',
        ['@media(max-width : 768px)']: {
            minWidth: '40vh'
        }
    },
    Cover: {
        width: '50%',
        height: '100%',
        borderRadius: '2vw 0 0 2vw'
    },
    RightDiv: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    Info: {
        fontSize: '1.5vw',
        marginBottom: '3vw',
        marginTop: '1vw',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Indie Flower, cursive',
        ['@media(max-width: 768px)']: {
            fontSize: '13px'
        }
    },
    Info_title: {
        color: '#C10000',
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
}


// ----- component -----

class Movie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: window.innerWidth / 2,
            swipe: false
        }
    }
    componentDidMount = () => {
        window.addEventListener('resize', () => {
            this.setState({ position: window.innerWidth / 2 })
        })
    }

    // ---------- swipe listeners ----------

    _onTouchStart = (e) => {
        this.setState({ swipe: true });
    }

    // ----- moblie move  -----
    _onTouchMove = (e) => {
        if (e.changedTouches[0].pageX > window.innerWidth / 2 && this.state.swipe)
            this.setState({ position: e.changedTouches[0].pageX });
    }

    // ----- desktop move -----
    _onMouseMove = (e) => {
        e.preventDefault()
        if (e.clientX > window.innerWidth / 2 && this.state.swipe)
            this.setState({ position: e.clientX - 10 });
    }
    _onTouchEnd = (e) => {
        if (this.state.position > window.innerWidth * 3 / 4)
            this.props.accept_rejectMovie({ id: this.props.currentItem.id, action: 'reject' })
        this.setState({ position: window.innerWidth / 2, swipe: false });
    }
    render() {
        const { classes } = this.props
        return (

            <Container className={classes.MyContainer} style={{ left: `calc(${this.state.position}px - 50vw)` }}
                // ----- moblie -----

                onTouchStart={this._onTouchStart}
                onTouchMove={this._onTouchMove}
                onTouchEnd={this._onTouchEnd}

                // ----- desktop -----

                onMouseDown={this._onTouchStart}
                onMouseMove={this._onMouseMove}
                onMouseUp={this._onTouchEnd}
            >
                <img className={classes.Cover} src={this.props.currentItem.imageURL} alt='cover' />
                <Container className={classes.RightDiv}>
                    <Typography variant='subtitle1' component='p' className={`${classes.Info} ${classes.Info_title}`} >{this.props.currentItem.title}</Typography>
                    <Typography variant='subtitle2' component='p' className={classes.Info} >Rating: {this.props.currentItem.rating}</Typography>
                    <Typography variant='subtitle2' component='p' className={classes.Info}>Summary: {this.props.currentItem.summary}</Typography>
                </Container>
            </Container>

        );
    }
};


const mapStateToProps = state => ({
    currentItem: state.list[state.actualItem]
})

const mapDispatchToProps = dispatch => ({

    accept_rejectMovie: action => dispatch(accept_rejectMovie(action))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Movie));