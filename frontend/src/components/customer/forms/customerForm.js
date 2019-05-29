import React, { Component } from "react";
import CustomerActions from "../../../actions/customerActions"

export class CustomerForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: {
                name: "",
                tel: "",
                address: ""
            },
            error: {
                customer: {
                    name: undefined,
                    tel: undefined,
                    address: undefined
                }
            }
        };
    }

    handleNameChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => ({
                ...prevState,
                customer: {
                    ...prevState.customer,
                    name: newValue
                }
            }),
            () => this.validateName()
        )
    };

    handleTelChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
                {
                    ...prevState,
                    customer: {
                        ...prevState.customer,
                        tel: newValue
                    }
                }
            ),
            () => this.validateTel()
        )
    };

    handleAddressChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
                {
                    ...prevState,
                    customer: {
                        ...prevState.customer,
                        address: newValue
                    }
                }
            ),
            () => this.validateAddress()
        )
    };

    validateName = () => {
        if(this.state.customer.name === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            name: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            name: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateTel = () => {
        if(this.state.customer.tel === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            tel: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            tel: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateAddress = () => {
        if(this.state.customer.address === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            address: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            address: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateForm = () => {
        let isValid = true;

        isValid = this.validateName() && isValid;
        isValid = this.validateTel() && isValid;
        isValid = this.validateAddress() && isValid;

        return isValid;
    };

    saveForm = (event) => {
        event.preventDefault();
        if(this.validateForm()) {
            CustomerActions.setCustomer(this.state.customer)
        }
    };

    render() {
        return (

            <form onSubmit={(e) => this.saveForm(e)}>

                <div className={ this.state.error.customer.name === true
                    ? "form-group has-error"
                    : this.state.error.customer.name === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={this.state.customer.name}
                        onChange={this.handleNameChange}
                        onBlur={this.validateName}
                        className={"form-control"}
                    />
                    {
                        this.state.error.customer.name &&
                        <div className="error-desc">Invalid value!</div>
                    }
                </div>

                <div className={this.state.error.customer.tel === true
                    ? "form-group has-error"
                    : this.state.error.customer.tel === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">Tel:</label>
                    <input
                        id="tel"
                        type="text"
                        name="tel"
                        placeholder="Enter tel number"
                        value={this.state.customer.tel}
                        onChange={this.handleTelChange}
                        onBlur={this.validateTel}
                        className={"form-control"}
                    />
                    {
                        this.state.error.customer.tel &&
                        <div className="error-desc">Invalid value!</div>
                    }
                </div>

                <div className={ this.state.error.customer.address === true
                    ? "form-group has-error"
                    : this.state.error.customer.address === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">Address:</label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={this.state.customer.address}
                        onChange={this.handleAddressChange}
                        onBlur={this.validateAddress}
                        className={"form-control"}
                    />
                    {
                        this.state.error.customer.address &&
                        <div className="error-desc">Invalid value!</div>
                    }
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
