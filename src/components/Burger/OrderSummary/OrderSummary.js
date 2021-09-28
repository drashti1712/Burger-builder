import React from 'react'
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Auxilliary/Auxilliary'

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map( igkey => {
        return (
            props.ingredients[igkey]>0 ?
            <li key={igkey}>
                <span style={{textTransform:"capitalize"}}> {igkey}:  </span>
                {props.ingredients[igkey]}
            </li> : null
        );
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: $ {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );

};

export default OrderSummary;