import React from 'react'
import Logo from '../../Logo/Logo'
import NavItems from '../NavigationItems/NavigationItems'
import BackDrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../hoc/Auxilliary/Auxilliary'
import classes from './SideDrawer.css'

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <BackDrop show={props.open} click={props.closed} /> 
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    );
}   

export default SideDrawer;
