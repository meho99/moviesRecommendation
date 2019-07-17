// ---------- BUTTONS COMPONENT ----------

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

// ------ style -----

const useStyles = makeStyles({
    Button:  props => ({
        borderBottom: `0.4vw solid ${props.color}`,
        background: 'none',
        height: '6vw',
        maxHeight: '9vh',
        minHeight: '5vh',
        borderRadius: '2vw',
        width: '40vw',
        cursor: 'pointer',
    }),
    Icon: {
        maxHeight: '4vh'
    }
})

// ----- component -----

const StyledButton = props =>
    <Button  className={useStyles({color: props.color}).Button} onClick={props.click}>
        <img src={props.imgURL}  className={useStyles().Icon} alt='icon' />
    </Button>


StyledButton.propTypes = {
    color: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired
};

export default StyledButton;