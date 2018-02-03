import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value:'',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation: {
                    require: true,
                    minlength: 5,
                    maxlength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value:'',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option:[
                        { value: 'fastest' , displayValue: 'Fastest' },
                        { value: 'cheapest' , displayValue: 'Cheapest' }
                    ]
                },
                value:'',
                validation: {
                    require: false
                },
                valid: true,
                touched: false
            },
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients)
        this.setState({
            loading: true
        })
        const orferInfo = {};
        for(let inputIdentifierIndex in this.state.orderForm){
            orferInfo[inputIdentifierIndex] = this.state.orderForm[inputIdentifierIndex].value
        }
        const post = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: orferInfo
        }
        
        axios.post('/orders.json', post)
            .then(response => {
                this.setState({ loading: false })
                //console.log(response)
                this.props.history.push('/')
            }).catch(error => {
                this.setState({ loading: false })
                //console.log(error)
            })
    }

    inputValidation = (value, rule) => {
        
        let isValid = false;

        if(rule.require){
            isValid = value.trim() !== '' && (!isValid);
        } else {
            return true
        }

        if(rule.minlength){
            isValid = value.length >= rule.minlength && isValid;
        }

        if(rule.maxlength){
            isValid = value.length <= rule.maxlength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        //console.log(event.target.value);
        
        const updateInputForm = {
            ...this.state.orderForm
        }

        const updateInputElement = { 
            ...updateInputForm[inputIdentifier] 
        }

        updateInputElement.value = event.target.value;
        updateInputElement.valid = this.inputValidation(updateInputElement.value, updateInputElement.validation);

        //updateInputElement.touched = true;

        //console.log(updateInputElement);
        updateInputForm[inputIdentifier] = updateInputElement;
        
        let formIsValid = true;
        for(let key in updateInputForm) {
            //console.log('updateInputForm[key].valid: '+updateInputForm[key].valid)
            formIsValid = updateInputForm[key].valid && formIsValid;
        }
            //console.log('formIsValid: '+formIsValid)

        this.setState({
            orderForm: updateInputForm,
            formIsValid: formIsValid
        })

    }

    inputMouseDown = (inputIdentifier) => {
        const updateInputForm = {
            ...this.state.orderForm
        }
        const updateInputElement = updateInputForm[inputIdentifier]
        updateInputElement.touched = true;
        this.setState({
            orderForm: updateInputForm
        })
    }

    render() {

        const formElement = [];

        for(let key in this.state.orderForm) {
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
        <form onSubmit={this.orderHandler}>
            {formElement.map(element => {
                    return (
                        <Input 
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value} 
                            inValid={!element.config.valid}
                            touched={element.config.touched}
                            mouseDown={() => this.inputMouseDown(element.id)}
                            shouldValidate={element.config.validation.require}
                            changed={(event) => this.inputChangeHandler(event, element.id)}/>
                    )
                })}
            <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>)
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
            </div>
        )
    }
}

export default ContactData