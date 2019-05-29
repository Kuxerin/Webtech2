import React, { Component } from "react";

export class CustomerOrders extends Component {

    render() {
        return (
            <div>
                <h2>Own orders ({this.props.customer.tel})</h2>
                <ul className="list-group">
                    {
                        this.props.orders.length === 0 &&
                        <div>Sorry no orders yet</div>
                    }
                    {
                        this.props.orders.map((order, i) =>
                            <li key={i} className="list-group-item">

                                <div className="row">
                                    <div className="col-sm-6">
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
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        order.windows.map((window, i) =>
                                                            <tr key={i}>
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
                                    </div>

                                    <div className="col-sm-6">
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
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
