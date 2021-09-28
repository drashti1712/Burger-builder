import React from 'react'
import classes from './Order.css'

const Order = (props) => {
    const ingredients=[];
    for(let igName in props.ingredients){
        ingredients.push({
            name:igName,
            amount:props.ingredients[igName]
        });
    }
    const ingredientOutput = ingredients.map(ig=>{
        return (<span className={classes.Span}
                    key={ig.name}>{ig.name} ({ig.amount}) </span>)
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;