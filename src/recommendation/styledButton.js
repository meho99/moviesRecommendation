// ---------- BUTTONS COMPONENT ----------

import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';

// ------ style -----

const Button = styled.button`
    border-bottom: 0.4vw solid ${props => props.color};
    background: none;
    height: 3.5vw;
    max-height: 9vh;
    min-height: 5vh;
    border-radius: 2vw;
    width: 40vw;
    padding: 0;
    cursor: pointer;
`
const Icon = styled.img`
    height 80%;
`

// ----- component -----

const StyledButton = props => 
        <Button color={props.color} onClick={props.click}>
            <Icon src={props.imgURL} alt='icon'/>
        </Button>


StyledButton.propTypes = {
    color: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired
};

export default StyledButton;