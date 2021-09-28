import React from 'react'
import classes from './Input.css'

const Input= (props) => {
    let InputElement = null;
    const InputClasses=[classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        InputClasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case('input'):
            InputElement=<input onChange={props.changed}
                        className={InputClasses.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value}/>
            break;
        case('textarea'):
            InputElement=<textarea onChange={props.changed}
                         className={InputClasses.join(' ')} 
                         {...props.elementConfig} 
                         value={props.value}/>
            break;
        case('select'):
            InputElement=(
                <select onChange={props.changed}
                className={InputClasses.join(' ')}  
                value={props.value}>
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            InputElement=<input 
                        onChange={props.changed} 
                        className={InputClasses.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
        </div>
    )
}

export default Input;