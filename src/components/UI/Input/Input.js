import React from 'react';
import classes from './Input.css';

const input = ( props ) => {

    let inputElement = null;
    const classesSetting = [classes.InputElement];
    //classesSetting.push(classes.InputElement);
    if(props.inValid && props.shouldValidate && props.touched ) {
        classesSetting.push(classes.InValid);
    }

    let validationError = null;
    if (props.inValid && props.touched) {
        validationError = <p>Please enter a valid value!</p>;
    }

    switch( props.elementType ){
        case('input'):
            inputElement = <input 
                className={classesSetting.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} 
                onMouseDown={props.mouseDown} />
            break;
        case('textarea'):
            inputElement = <textarea 
                className={classesSetting.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed} 
                onMouseDown={props.mouseDown}/>
            break;
        case('select'):
            inputElement = 
            (
            <select 
                className={classesSetting.join(' ')} 
                value={props.value} 
                onChange={props.changed}
                onMouseDown={props.mouseDown}
                >
                {props.elementConfig.option.map(option =>{
                    return (
                    <option 
                        key={option.value} 
                        value={option.value}>
                        {option.displayValue}
                    </option>
                    )
                })}
            </select>
            )
            break;
        default:
            inputElement = <input 
                className={classesSetting.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}
                onMouseDown={props.mouseDown} />
            break;
    }


    return(
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input