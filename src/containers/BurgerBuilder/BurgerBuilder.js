import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

import Aux from '../../hoc/Auxilliary/Auxilliary'

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}

class BurgerBuilder extends Component {
    state={
        ingredients :null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    };

    componentDidMount(){
        axios.get("https://react-my-burger-92ca1-default-rtdb.firebaseio.com/ingredients.json")
        .then(response=>{
            this.setState({
                ingredients:response.data
            });
        })
        .catch(error => {
            this.setState({error:true});
        });
    }
    purchaseHandler = () => {
        this.setState({
            purchasing:true
        })
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:false
        })
    }

    purchaseContinueHandler = () => {
        // alert("Your order is placed!");
        
        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price="+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map((igkey) => {
            return ingredients[igkey];
        }).reduce((sum,elem)=>{
            return sum+elem;
        },0);
        this.setState({
            purchasable:sum>0
        });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount=oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const oldPrice=this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // if(oldCount<=0){
        //     return;
        // }
        const newCount=oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const oldPrice=this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);
        };

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let i in disabledInfo){
            disabledInfo[i] = (disabledInfo[i]<=0);
        }

        let orderSummary = null;

        let burger= this.state.error? <p>Error occured</p> : <Spinner/>
        if(this.state.ingredients){
            burger=(
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        addedIngredient={this.addIngredientHandler} 
                        removedIngredient={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        click={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            );
            orderSummary=<OrderSummary 
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        
    
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);