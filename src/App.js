import React, { Component } from 'react';
//import './App.css';
import Layout from './hoc/Layout/Layout';
import BugerBuilder from './containers/BugerBuilder/BugerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={BugerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
