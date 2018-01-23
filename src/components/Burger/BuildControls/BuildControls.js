import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad' , type: 'salad' },
    { label: 'Bacon' , type: 'bacon' },
    { label: 'Cheese' , type: 'cheese' },
    { label: 'Meat' , type: 'meat' }
]

const BuildControls = ( props ) => (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>&#36;{props.price.toFixed(2)}</strong></p>
        {controls.map(cont => <BuildControl 
                               label={cont.label}
                               key={cont.label}
                               addIngrident={() => props.addIngredient(cont.type)}
                               removeIngrident={() => props.removeIngredient(cont.type)}
                               disabled={props.disabled[cont.type]}
                               />)}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.purchasingHandle}> 
        Order Now 
        </button>
    </div>
)

export default BuildControls