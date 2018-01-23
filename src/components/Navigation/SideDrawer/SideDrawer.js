import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = ( props ) => {
    let addClassesName = [classes.SideDrawer, classes.Close];
    if(props.show) {
        addClassesName = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={addClassesName.join(' ')}>
                <div className={classes.Logo}>
                <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer