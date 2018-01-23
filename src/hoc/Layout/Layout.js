import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        SideDrawerDisplay: false
    }

    CloseSideDrawer = () => {
        this.setState({
            SideDrawerDisplay: false
        })
    }

    OpenSideDrawer = () => {
        this.setState({
            SideDrawerDisplay: true
        })
    }

    SideDrawerTogger = () => {
        this.setState(prevState => {
            return {SideDrawerDisplay: !prevState.SideDrawerDisplay}
        })
    }

    render() {
        
        return(
            <Aux>
            <Toolbar toggle={this.SideDrawerTogger}/>
            <SideDrawer show={this.state.SideDrawerDisplay} closed={this.CloseSideDrawer}/>
            <main className={classes.Contents}>
                {this.props.children}
            </main>
            </Aux>
        );
    }
}

export default Layout