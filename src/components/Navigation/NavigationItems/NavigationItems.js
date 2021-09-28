import React from 'react'
import NavItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link='/' exact> BurgerBuilder </NavItem>
        <NavItem link='/orders'> Orders </NavItem>
    </ul>
);

export default NavigationItems;
