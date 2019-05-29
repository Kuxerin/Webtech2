import React, { Component } from "react";
import { CustomerForm } from "./forms/customerForm"
import { CustomerMain } from "./customerMain"
import CustomerStore from "./../../stores/customerStore"
import CustomerActions from "./../../actions/customerActions"

export class CustomerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: CustomerStore._customer,
            orders: CustomerStore._orders,
        };
    }

    onCustomerChange = () => {
        this.setState({customer : CustomerStore._customer});
    };

    onOrdersChange = () => {
        this.setState({orders : CustomerStore._orders});
    };

    componentDidMount() {
        CustomerStore.addCustomerChangeListener(this.onCustomerChange);
        CustomerStore.addOrdersChangeListener(this.onOrdersChange);
    }

    componentWillUnmount() {
        CustomerStore.removeCustomerChangeListener(this.onCustomerChange);
        CustomerStore.removeOrdersChangeListener(this.onOrdersChange);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">

                    <div className="text-center header-text">
                        <h1>
                            {this.state.customer !== undefined &&
                                <span>
                                    Welcome "{this.state.customer.name}"!
                                    &nbsp;
                                    <i className="clickable fas fa-user-times" onClick={() => {CustomerActions.unsetCustomer();}} />
                                </span>
                            }
                        </h1>
                    </div>
                    {
                        (this.state.customer === undefined)
                            ? <CustomerForm />
                            : <CustomerMain customer={this.state.customer} orders={this.state.orders} />
                    }
                </div>
            </React.Fragment>
        )
    }
}
