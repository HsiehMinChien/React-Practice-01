import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        
        state = {
            error: null
        }

        componentWillMount = () => {
            //console.log('[WithErrorHandler]componentWillMount')
            this.reqinterceptors = axios.interceptors.request.use(req => req);
            this.resinterceptors = axios.interceptors.response.use(res => res, error => {
                //console.log('axios.interceptors.response')
                //console.log(error)
                this.setState({ error: error });
            })
        }
        
        componentWillUnmount = () => {
            //console.log('[WithErrorHandler]componentWillUnmount', this.reqinterceptors,this.resinterceptors)
            axios.interceptors.request.eject(this.reqinterceptors);
            axios.interceptors.response.eject(this.resinterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Aux>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    <p style={{textAlign: 'center'}}>{this.state.error ? this.state.error.message : null}</p>
                </Modal>
                <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    
    }

}

export default withErrorHandler