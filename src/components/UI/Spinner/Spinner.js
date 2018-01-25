import React from 'react';
import classes from './Spinner.css'

const spinner = () => (
    <div>
        <div className={classes.Spinner}></div>
        <div style={{ textAlign: 'center'}}>Under processing...</div>
    </div>
)

export default spinner