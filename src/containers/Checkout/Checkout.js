import React, { Component } from "react"
import { Route } from "react-router";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from "./ContactData/ContactData";
class Checkout extends Component{
    state = {
        ingredients:null,
        totalPrice:0
    }

    UNSAFE_componentWillMount(){
        const query= new URLSearchParams(this.props.location.search);
        const newarray=[];
        let price=0;
        for(let param of query.entries()){
            if(param[0]==='price'){
                price=param[1];
            }
            else{
                newarray.push(param[1]);
            }
        }
        this.setState({
            ingredients:{
                bacon:+newarray[0],
                cheese:+newarray[1],
                meat:+newarray[2],
                salad:+newarray[3]
            },
            totalPrice:price
        })
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path="/checkout/contact-data" 
                       render={(props)=>(<ContactData 
                        ingredients={this.state.ingredients} 
                       totalPrice={this.state.totalPrice}
                       {...props} />)}/>
            </div>
        );
    }
}

export default Checkout;