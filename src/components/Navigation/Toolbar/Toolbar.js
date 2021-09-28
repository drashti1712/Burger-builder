import React from 'react'
import Logo from '../../Logo/Logo'
import NavItems from '../NavigationItems/NavigationItems'
import DrawToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import classes from './Toolbar.css'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawToggle clicked={props.drawerToggle}/>
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
);

export default Toolbar;
