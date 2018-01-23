import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    meat: 1.3,
    bacon: 0.5,
    cheese: 0.4,
    salad: 0.7
}

class BugerBuilder extends Component { 

    state = {
        ingredients:{
            meat: 0,
            bacon: 0,
            salad: 0,
            cheese: 0,
        },
        totalprice: 4,
        purchasable: false,
        purchasing: false
    }
    
    addIngredientHandler = (type) => {

        const oldIngredients = this.state.ingredients[type];
        const newIngredient = oldIngredients + 1;
        const updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = newIngredient;

        const addPrice = INGREDIENTS_PRICES[type];
        const oldtotalprices = this.state.totalprice;
        const updatetotalprice = oldtotalprices + addPrice;

        this.setState({
            ingredients: updateIngredients,
            totalprice: updatetotalprice
        })
        this.updatePurchasableState(updateIngredients)
    }

    updatePurchasableState = (ingredients) => {

        //const ingredients = { ...this.state.ingredients }
        const sum = Object.keys(ingredients)
                    .map(igkey => {
                        return ingredients[igkey]
                    }).reduce((sum, el) => {
                        return sum + el;
                    } ,0)

        const updatePurchasable = (sum > 0)

        this.setState({
            purchasable: updatePurchasable
        })
    }

    removeIngredientHendler = (type) => {

        const oldIngredients = this.state.ingredients[type];
        if(oldIngredients <= 0) { return; }
        const newIngredient = oldIngredients - 1;
        console.log(oldIngredients[type]);
        const updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = newIngredient;

        const oldtotalprices = this.state.totalprice;
        const deletePrice = INGREDIENTS_PRICES[type];
        let updatetotalprice = oldtotalprices - deletePrice;

        //Avoid error
        //if(newIngredient < 0) {
            //return;
            //updateIngredients[type] = newIngredient;
            //updatetotalprice = oldtotalprices - deletePrice;
        //}

        this.setState({
            ingredients: updateIngredients,
            totalprice: updatetotalprice
        })
        this.updatePurchasableState(updateIngredients)
    }

    updatePurchasingHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    closePurchasingHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchasingHandler = () => {
        alert('You get this burger!!')
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        // Add 'show' into OrderSummary for fix button function appear on screen when modal dosen't appear.
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.closePurchasingHandler}>
                    <OrderSummary 
                        show={this.state.purchasing}
                        ingredients={this.state.ingredients} 
                        price={this.state.totalprice}
                        purchaseCancel={this.closePurchasingHandler}
                        purchaseContinue={this.continuePurchasingHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredient={this.addIngredientHandler} 
                    removeIngredient={this.removeIngredientHendler}
                    disabled={disableInfo}
                    price={this.state.totalprice}
                    purchasable={this.state.purchasable}
                    purchasingHandle={this.updatePurchasingHandler}
                />
            </Aux>
        )
    }
}

export default BugerBuilder