import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients)
        this.setState({
            loading: true
        })

        const post = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Jeff',
                address: 'Taipei',
                zipcode: '11673',
                email: 'test@test.com',
                phone: '+886987654321'
            }
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

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code"/>
            <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
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