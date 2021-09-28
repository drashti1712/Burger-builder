import React, {Component} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Aux from '../Auxilliary/Auxilliary'

import classes from './Layout.css'

class Layout extends Component {
    state={
        showSD:false
    }
    sideDrawerCloseHandler = () => {
        this.setState({
            showSD:false
        });
    }
    DrawerToggleHandler = () =>{
        this.setState((prevState)=>{
           return {showSD: !prevState.showSD}
        });
    }

    render(){
        return (
            <Aux>
                <Toolbar drawerToggle={this.DrawerToggleHandler}/>
                <SideDrawer open={this.state.showSD} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );        
    }
}
    
export default Layout;