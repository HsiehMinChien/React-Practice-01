import React from 'react';
//import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    const SummaryIngrident = Object.keys(props.ingredients)
        .map(igKey => 
            { return ( <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li> )
            })
    return (
        <div
        style={{ 
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
            <p>Your Order</p>
            <p>A delicious burger with following ingredients:</p>
            <p><strong>Total Price: &#36;{props.price.toFixed(2)}</strong></p>
            <ul>
              {SummaryIngrident}
            </ul>
            <p>Countine to order?</p>
            <Button clicked={props.purchaseCancel} buttonType='Danger'>CANCAL</Button>
            <Button clicked={props.purchaseContinue} buttonType='Success'>CONTINUE</Button>
        </div>
    );

}

export default orderSummary