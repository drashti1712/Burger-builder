import React,{Component} from 'react'
import Aux from '../../../hoc/Auxilliary/Auxilliary'
import BackDrop from '../BackDrop/BackDrop'
import classes from './Modal.css'

class Modal extends Component {

    //We can also use pure component but that wil just perform more no. of checks
    //here, it is enough to check only the 'show' prop
    shouldComponentUpdate(nextProps, nextState){
        return ((nextProps.show !== this.props.show) || (nextProps.children !== this.props.children));
    }

    // componentWillUpdate() {
    //     console.log("[Modal] Will update");
    // }

    render(){
        return (
            <Aux>
                <BackDrop show={this.props.show} click={this.props.modalClosed}/>
                <div 
                className={classes.Modal}
                style={{
                    transform : this.props.show ? 'translateY(0)':'translateY(-100vh)',
                    opacity : this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
    
    


export default Modal;