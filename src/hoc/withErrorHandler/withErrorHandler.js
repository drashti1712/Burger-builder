import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxilliary/Auxilliary'

const withErrorhandler = (WrappedComponent, axios) =>{
    return class extends Component {
        state={
            error:null
        };
        
        constructor(props){
        // componentDidMount(){
            super(props);
            this.reqinterceptors=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resinterceptors=axios.interceptors.response.use(res=>res, error=>{
                this.setState({error:error});
            });
        }
        

        //remove the interceptors in components after they are unmounted, to save space!
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqinterceptors);
            axios.interceptors.response.eject(this.resinterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorhandler;