import React, { Component } from "react";
import { CustomerOrders } from "./customerOrders";
import { CustomerOrderForm } from "./forms/customerOrderForm";
import OrderActions from "./../../actions/orderActions"

export class CustomerMain extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    createOrder = (order) => {
        let parsedWindows = [...order.windows];
        for (let i = 0; i < parsedWindows.length; i++) {
            parsedWindows[i].width = parseInt(parsedWindows[i].width);
            parsedWindows[i].height = parseInt(parsedWindows[i].height);
            parsedWindows[i].shutter = {
                ...parsedWindows[i].shutter,
                isFinished: false
            }
        }

        const orderToCreate = {
            ...order,
            isInstalled: false,
            customer: this.props.customer,
            windows: parsedWindows
        };

        OrderActions.createOrder(orderToCreate);
    };

    render() {
        return (
            <React.Fragment>
                <CustomerOrderForm createOrderCallback={this.createOrder} />
                <hr />
                <CustomerOrders customer={this.props.customer} orders={this.props.orders} />
            </React.Fragment>
        )
    }
}
