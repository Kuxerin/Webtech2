import React, { Component } from "react";

export class OrderStatistics extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    getFinishedOrdersCount = () =>{
        return this.props.orders.filter((order) => {
            return (order.isInstalled !== undefined && order.isInstalled === true)
        }).length
    };

    getUnfinishedOrdersCount = () =>{
        return this.props.orders.filter((order) => {
            return (order.isInstalled === undefined || order.isInstalled === false)
        }).length
    };

    getCurrentBalance = () =>{
        let balance = 0;

        this.props.orders.forEach(order => {
            if(order.invoice !== undefined && order.invoice !== null && order.invoice.isPaid === true) {
                balance += order.invoice.price;
            }
        });

        return balance;
    };

    getPendingBalance = () =>{
        let balance = 0;

        this.props.orders.forEach(order => {
            if(order.invoice !== undefined && order.invoice !== null && order.invoice.isPaid === false) {
                balance += order.invoice.price;
            }
        });

        return balance;
    };

    render() {
        const totalOrdersCount = this.props.orders.length;
        const finishedOrdersCount = this.getFinishedOrdersCount();
        const unfinishedOrdersCount = this.getUnfinishedOrdersCount();
        const currentBalance = this.getCurrentBalance();
        const pendingBalance = this.getPendingBalance();

        return (

            <div>
                <h2>Statistics</h2>
                <div>
                    <div><label className="details-label">Total orders: </label>{totalOrdersCount}</div>
                    <div><label className="details-label">- Finished: </label>{finishedOrdersCount}</div>
                    <div><label className="details-label">- Unfinished: </label>{unfinishedOrdersCount}</div>
                    <div><label className="details-label">Current balance: </label>{currentBalance} HUF</div>
                    <div><label className="details-label">- Pending: </label>{pendingBalance} HUF</div>
                </div>
            </div>
        )
    }
}

