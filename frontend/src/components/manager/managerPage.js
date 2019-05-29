import React, { Component } from "react";
import { CreateInvoiceForm } from "./managerInvoiceForm";
import { OrderStatistics } from "./managerStatistics";
import OrderStore from "./../../stores/orderStore"
import OrderActions from "./../../actions/orderActions"

export class ManagerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allOrders: OrderStore._allOrders
        };
    }

    onAllOrdersChange = () => {
        this.setState({allOrders : OrderStore._allOrders});
    };

    componentDidMount() {
        OrderStore.addAllOrdersChangeListener(this.onAllOrdersChange);
        OrderActions.refreshOrders();
    }

    componentWillUnmount() {
        OrderStore.removeAllOrdersChangeListener(this.onAllOrdersChange);
    }

    setFilter = (event) => {
        const value = event.target.value;

        this.setState((prevState) => ({
            ...prevState,
            filter: value
        }))
    };

    getOrderStatus = (order) => {
        let isUnassembled = false;
        order.windows.forEach((window) => {
            if(window.shutter.isFinished === false) {
                isUnassembled = true;
            }
        });

        if(isUnassembled === true) {
            return "UNASSEMBLED";
        }

        let isInstalled = (order.isInstalled === true);

        if(isInstalled === false) {
            return "ASSEMBLED";
        }

        let hasInvoice =  (order.invoice !== undefined && order.invoice !== null);

        if(hasInvoice === false) {
            return "INSTALLED";
        }

        let isInvoicePaid = (order.invoice.isPaid === true);

        if(isInvoicePaid === false) {
            return "UNPAID";
        } else {
            return "PAID";
        }
    };

    installShutters = (orderID) => {
        OrderActions.installShutter(orderID);
    };

    createInvoice = (invoice, orderID) => {
        const invoiceToCreate = {
            price: parseInt(invoice.price),
            isPaid: invoice.isPaid
        };

        OrderActions.createInvoice(orderID, invoiceToCreate);
    };

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <OrderStatistics orders={this.state.allOrders} />

                    <div>
                        <h2>Orders</h2>

                        <ul className="list-group margin-top-30">
                            {
                                this.state.allOrders.length === 0 &&
                                <div>No orders yet</div>
                            }
                            {
                                this.state.allOrders.map((order, i) =>
                                        {
                                            const orderStatus = this.getOrderStatus(order);

                                            return <li key={i} className="list-group-item">

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div>
                                                            <h3>
                                                                ID:
                                                                &nbsp;
                                                                <span style={{fontSize: '14px'}}>
                                                                    {order._id}
                                                                </span>
                                                            </h3>
                                                        </div>

                                                        <div>
                                                            <h3>
                                                                Status: 
                                                                &nbsp;
                                                                <span className="label label-info" style={{fontSize: '14px'}}>
                                                                    {orderStatus}
                                                                </span>
                                                            </h3>
                                                        </div>

                                                        <div>
                                                            <div>
                                                                <h3>Customer:</h3>
                                                            </div>
                                                            <div>
                                                                <div><label className="details-label">Name: </label>{order.customer.name}</div>
                                                                <div><label className="details-label">Tel: </label>{order.customer.tel}</div>
                                                                <div><label className="details-label">Address: </label>{order.customer.address}</div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h3>
                                                                Notes:
                                                                &nbsp;
                                                                <span style={{fontSize: '14px'}}>
                                                                    {order.notes}
                                                                </span>
                                                            </h3>
                                                        </div>

                                                        <div>
                                                            <div>
                                                                <h3>Shutters:</h3>
                                                            </div>
                                                            <div>
                                                                <table className="table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Window size(width first)</th>
                                                                        <th>Color</th>
                                                                        <th>Material</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {
                                                                        order.windows.map((window, j) =>
                                                                            <tr key={j}>
                                                                                <td>{window.width}mm x {window.height}mm</td>
                                                                                <td>{window.shutter.color}</td>
                                                                                <td>{window.shutter.material}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        {
                                                            (orderStatus === "ASSEMBLED") &&
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-block"
                                                                onClick={() => this.installShutters(order._id)}
                                                            >
                                                                Install shutter(s)
                                                            </button>
                                                        }

                                                        {
                                                            (orderStatus === "INSTALLED") &&
                                                            <CreateInvoiceForm createInvoiceCallback={(invoice) => this.createInvoice(invoice, order._id)} />

                                                        }

                                                        {
                                                            (orderStatus === "UNPAID" || orderStatus === "PAID") &&
                                                            <div>
                                                                <div>
                                                                    <h3>Invoice:</h3>
                                                                </div>
                                                                <div>
                                                                    <div><label className="details-label">Name: </label>{order.customer.name}</div>
                                                                    <div><label className="details-label">Price: </label>{order.invoice.price} HUF</div>
                                                                    <div><label className="details-label">Paid: </label>{order.invoice.isPaid ? "true" : "false"}</div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </li>

                                        }

                                    )
                            }
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

