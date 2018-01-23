import React from 'react';
import classes from './Logo.css'
import BurgerLogo from '../../asserts/images/burger-logo.png'

const logo = () => (
    <div className={classes.BurgerLogo}>
        <img src={BurgerLogo} alt='myBurgerLogo' />
    </div>
)

export default logo