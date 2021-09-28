import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>$ {props.price.toFixed(2)}</strong></p>
        {controls.map(control => 
            <BuildControl
             key={control.type}
             added={()=>{props.addedIngredient(control.type)}}
             removed={() => {props.removedIngredient(control.type)}}
             disabled={props.disabled[control.type]}
             label={control.label}/>
        )}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable} 
            onClick={props.click}> ORDER NOW </button>
    </div>
);

export default BuildControls;