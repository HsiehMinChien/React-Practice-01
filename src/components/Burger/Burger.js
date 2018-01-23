import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    
    let transferIngredients = Object.keys(props.ingredients)
                                      .map(igkey => 
                                        { return [...Array(props.ingredients[igkey])].map((_,id) => {
                                            return <BurgerIngredient type={igkey} key={igkey + id} />
                                            })
                                        }).reduce((arr, el) => arr.concat(el),[])

    console.log(transferIngredients)
    if(transferIngredients.length === 0) {
        transferIngredients = <p>Please add some ingredients!!</p>
    }

    return (
    <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
        {transferIngredients}
        <BurgerIngredient type='bread-bottom' />
    </div>
    )
}

export default burger