import React, { Component } from "react";
import OrderStore from "./../../stores/orderStore"
import OrderActions from "./../../actions/orderActions"

export class WorkerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allOrders: OrderStore._allOrders,
            selectedShutter: {
                orderID: undefined,
                shutterID: undefined
            }
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

    finishShutter = (orderID, shutterID) => {
        OrderActions.finishShutter(orderID, shutterID);
    };

    setShutter = (orderID, shutterID) => {
        if(this.state.selectedShutter.orderID === orderID && this.state.selectedShutter.shutterID === shutterID ) {
            this.setState((prevState) => ({
                ...prevState,
                selectedShutter: {
                    orderID: undefined,
                    shutterID: undefined
                }
            }))
        } else {
            this.setState((prevState) => ({
                ...prevState,
                selectedShutter: {
                    orderID: orderID,
                    shutterID: shutterID
                }
            }))
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <div>
                    <h2>Orders</h2>
                    <ul className="list-group">
                        {
                            this.state.allOrders.length === 0 &&
                            <div>No orders found</div>
                        }
                        {this.state.allOrders.map((order, i) =>
                            <li key={i} className="list-group-item">

                                <div className="row">
                                <div className="col-sm-12">
                                    <div>
                                        <div>
                                            <div>
                                                <h3>
                                                    ID:
                                                    &nbsp;
                                                    <span style={{fontSize: '14px'}}>
                                                        {order._id}
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <h3>
                                                    Notes:
                                                    &nbsp;
                                                    <span style={{fontSize: '14px'}}>
                                                        {order.notes}
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                <h3>Shutters:</h3>
                                            </div>
                                            <div>
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th>Window size(W x H)</th>
                                                        <th>Color</th>
                                                        <th>Material</th>
                                                        <th>Assembled</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        order.windows.map((window, j) =>
                                                            {
                                                                const isSelectedShutter = (order._id === this.state.selectedShutter.orderID
                                                                    && window.shutter.id === this.state.selectedShutter.shutterID);

                                                                return <React.Fragment key={j}>
                                                                    <tr>
                                                                        <td>{window.width}mm x {window.height}mm</td>
                                                                        <td>{window.shutter.color}</td>
                                                                        <td>{window.shutter.material}</td>
                                                                        <td>{window.shutter.isFinished ? "true" : "false"}</td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary btn-block"
                                                                                onClick={() => this.setShutter(order._id, window.shutter.id)}
                                                                            >
                                                                                {isSelectedShutter ? "Hide parts" : "Show parts"}
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    {
                                                                        isSelectedShutter &&
                                                                        <tr>
                                                                            <td colSpan={6} className="no-top-border">
                                                                                <div className="col-sm-offset-1 col-sm-11">
                                                                                    <div>
                                                                                        <h3>Parts:
                                                                                        &nbsp;
                                                                                        {!window.shutter.isFinished &&
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-primary"
                                                                                                onClick={() => this.finishShutter(order._id, window.shutter.id)}
                                                                                            >
                                                                                                Finish job
                                                                                            </button>
                                                                                        }
                                                                                        </h3>
                                                                                    </div>
                                                                                    <div>
                                                                                        <table className="table">
                                                                                            <thead>
                                                                                            <tr>
                                                                                                <th>Count</th>
                                                                                                <th>Description</th>
                                                                                            </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                            {
                                                                                                window.shutter.parts.map((part, k) =>
                                                                                                    <tr key={k}>
                                                                                                        <td>{part.count}</td>
                                                                                                        <td>{part.description}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            }
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </React.Fragment>

                                                            }
                                                        )
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

