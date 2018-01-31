import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount = () => {
        axios.get('/orders.json')
            .then(res => {
                //console.log(res.data)
                const fatchOrders = [];
                for(let key in res.data) {
                    //console.log(key);
                    fatchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                    //console.log(fatchOrders)
                    this.setState({ orders: fatchOrders })
                }
                this.setState({ loading: false })
            }).catch(err => {
                this.setState({ loading: false })
            })
    }
    
    render() {
        const orders = this.state.orders.map(order => {
            return (<Order key={order.id} price={order.price} ingredients={order.ingredients}/>)
        })
        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)