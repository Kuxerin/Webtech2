import React, { Component } from "react";
import ShutterStore from "../../../stores/shutterStore"
import ShutterActions from "../../../actions/shutterActions"

export class CustomerOrderForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shutterColors: ShutterStore._shutterColors,
            shutterMats: ShutterStore._shutterMats,
            order: {
                notes: "",
                windows: []
            },
            error: {
                windowsSize: undefined,
                order: {
                    windows: []
                }
            }
        };
    }

    onShutterColorsChange = () => {
        this.setState({shutterColors : ShutterStore._shutterColors});
    };

    onShutterMatsChange = () => {
        this.setState({shutterMats : ShutterStore._shutterMats});
    };

    componentDidMount() {
        ShutterStore.addShutterColorsChangeListener(this.onShutterColorsChange);
        ShutterStore.addShutterMatsChangeListener(this.onShutterMatsChange);

        if (this.state.shutterColors.length === 0) {
            ShutterActions.refreshShutterColors();
        }

        if (this.state.shutterMats.length === 0) {
            ShutterActions.refreshShutterMats();
        }
    }

    componentWillUnmount() {
        ShutterStore.removeShutterColorsChangeListener(this.onShutterColorsChange);
        ShutterStore.removeShutterMatsChangeListener(this.onShutterMatsChange);
    }

    addNewShutter = () => {
        let newWindow = {
            width: 0,
            height: 0,
            shutter: {
                color: "",
                material: "",
            }
        };

        let newWindowError = {
            width: undefined,
            height: undefined,
            shutter: {
                color: undefined,
                material: undefined,
            }
        };

        this.setState((prevState) => ({
            ...prevState,
            order: {
                ...prevState.order,
                windows: [
                    ...prevState.order.windows,
                    newWindow
                ]
            },
            error: {
                ...prevState.error,
                windowsSize: false,
                order: {
                    ...prevState.error.order,
                    windows: [
                        ...prevState.error.order.windows,
                        newWindowError
                    ]
                }
            }
        }))
    };

    deleteShutter = (i) => {
        let windows = [...this.state.order.windows];
        windows.splice(i, 1);
        let windowsError = [...this.state.error.order.windows];
        windowsError.splice(i, 1);

        this.setState({
            order:{
                windows: windows
            },
            error: {
                order: {
                    windows: windowsError
                }
            }
        })
    };

    handleWindowWidthChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].width = newValue;

        this.setState((prevState) => ({
                ...prevState,
                order: {
                    ...prevState.order,
                    windows: windows
                }
            }),
            () => this.validateWindowWidth(i)
        )
    };

    handleWindowHeightChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].height = newValue;

        this.setState((prevState) => ({
                ...prevState,
                order: {
                    ...prevState.order,
                    windows: windows
                }
            }),
            () => this.validateWindowHeight(i)
        )
    };

    handleShutterColorChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].shutter.color = newValue;

        this.setState((prevState) => ({
                ...prevState,
                order: {
                    ...prevState.order,
                    windows: windows
                }
            }),
            () => this.validateShutterColor(i)
        )
    };

    handleShutterMaterialChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].shutter.material = newValue;

        this.setState((prevState) => ({
                ...prevState,
                order: {
                    ...prevState.order,
                    windows: windows
                }
            }),
            () => this.validateShutterMaterial(i)
        )
    };

    handleNotesChange = (event) => {
        const newValue = event.target.value;

        this.setState((prevState) => ({
            ...prevState,
            order: {
                ...prevState.order,
                notes: newValue
            }
        }))
    };

    validateWindowWidth = (i)  => {
        const width = this.state.order.windows[i].width;

        if(width <= 0) {
            let error = {...this.state.error};
            error.order.windows[i].width = true;

            this.setState((prevState) => (
                {
                    ...prevState,
                    error: error
                }
            ));

            return false;
        } else {
            let error = {...this.state.error};
            error.order.windows[i].width = false;

            this.setState((prevState) => (
                {
                    ...prevState,
                    error: error
                }
            ));

            return true;
        }
    };

    validateWindowHeight = (i) => {
        const height = this.state.order.windows[i].height;

        if(height <= 0) {
            let error = {...this.state.error};
            error.order.windows[i].height = true;

            this.setState((prevState) => (
                {
                    ...prevState,
                    error: error
                }
            ));

            return false;
        } else {
            let error = {...this.state.error};
            error.order.windows[i].height = false;

            this.setState((prevState) => (
                {
                    ...prevState,
                    error: error
                }
            ));

            return true;
        }
    };

    validateShutterColor = (i) => {
        const color = this.state.order.windows[i].shutter.color;

        let found = false;

        for (let j = 0; j < this.state.shutterColors.length; j++) {
            if(this.state.shutterColors[j].color === color) {
                found = true;
            }
        }

        if(!found) {
            let error = {...this.state.error};
            error.order.windows[i].shutter.color = true;

            this.setState((prevState) => (
                {
                    ...prevState,
                    error: error
                }
            ));

            return false;
        } else {
            let error = {...this.state.error};
            error.order.windows[i].shutter.color = false;

            this.setState((prevState) => (
                {
                    ...prevState,
                    error: error
                }
            ));

            return true;
        }
    };

    validateShutterMaterial = (i) => {
        const material = this.state.order.windows[i].shutter.material;

        let found = false;

        for (let j = 0; j < this.state.shutterMats.length; j++) {
            if(this.state.shutterMats[j].material === material) {
                found = true;
            }
        }

        if(!found) {
            let error = {...this.state.error};
            error.order.windows[i].shutter.material = true;

            this.setState((prevState) => (
                {
                    ...prevState,
                    error: error
                }
            ));

            return false;
        } else {
            let error = {...this.state.error};
            error.order.windows[i].shutter.material = false;

            this.setState((prevState) => (
                {
                    ...prevState,
                    error: error
                }
            ));

            return true;
        }
    };

    validateForm = () => {
        let isValid = true;

        if(this.state.order.windows.length === 0) {
            isValid = false;
            this.setState((prevState) => ({
                ...prevState,
                error: {
                    ...prevState.error,
                    windowsSize: true
                }
            }))
        } else {
            this.setState((prevState) => ({
                ...prevState,
                error: {
                    ...prevState.error,
                    windowsSize: false
                }
            }))
        }

        this.state.order.windows.forEach((window, i) => {
            isValid = this.validateWindowWidth(i) && isValid;
            isValid = this.validateWindowHeight(i) && isValid;
            isValid = this.validateShutterColor(i) && isValid;
            isValid = this.validateShutterMaterial(i) && isValid;
        });

        return isValid;
    };

    saveForm = (event) => {
        event.preventDefault();
        if(this.validateForm()) {
            this.props.createOrderCallback(this.state.order);
            this.setState({
                order: {
                    notes: "",
                    windows: []
                },
                error: {
                    windowsSize: undefined,
                    order: {
                        windows: []
                    }
                }
            })
        }
    };


    render() {
        return (

            <form  onSubmit={(e) => this.saveForm(e)}>
                <h2>Create order</h2>
                <div>
                    <div>
                        <h3>Shutters
                            {
                                this.state.error.windowsSize === true &&
                                <span className="error-desc">(min 1)</span>
                            }
                            &nbsp;&nbsp;
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.addNewShutter}
                            >
                                Add new
                            </button>
                        </h3>
                    </div>
                    <div>
                        <div className={'col-sm-6'}>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th width={'150px'}>Window width</th>
                                    <th width={'150px'}>Window height</th>
                                    <th>Color</th>
                                    <th>Material</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.order.windows.map((window, i) =>
                                        <tr key={i}>
                                            <td>
                                                <div>
                                                    <div
                                                        className={ this.state.error.order.windows[i].width === true
                                                            ? "form-group has-error"
                                                            : this.state.error.order.windows[i].width === false
                                                                ? "form-group has-success"
                                                                : "form-group"
                                                        }
                                                    >
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                placeholder="Enter width"
                                                                value={window.width}
                                                                onChange={(event) => this.handleWindowWidthChange(i, event)}
                                                                onBlur={() => this.validateWindowWidth(i)}
                                                                className="form-control"
                                                            />

                                                            <span className="input-group-addon">mm</span>
                                                        </div>
                                                        {
                                                            this.state.error.order.windows[i].width &&
                                                            <div className="error-desc">Invalid value!</div>
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div
                                                        className={ this.state.error.order.windows[i].height === true
                                                            ? "form-group has-error"
                                                            : this.state.error.order.windows[i].height === false
                                                                ? "form-group has-success"
                                                                : "form-group"
                                                        }
                                                    >
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                placeholder="Enter height"
                                                                value={window.height}
                                                                onChange={(event) => this.handleWindowHeightChange(i, event)}
                                                                onBlur={() => this.validateWindowHeight(i)}
                                                                className="form-control"
                                                            />

                                                            <span className="input-group-addon">mm</span>
                                                        </div>
                                                        {
                                                            this.state.error.order.windows[i].height &&
                                                            <div className="error-desc">Invalid value!</div>
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={ this.state.error.order.windows[i].shutter.color === true
                                                    ? "form-group has-error"
                                                    : this.state.error.order.windows[i].shutter.color === false
                                                        ? "form-group has-success"
                                                        : "form-group"
                                                }
                                                >
                                                    <select
                                                        className="form-control"
                                                        value={window.shutter.color}
                                                        onChange={(event) => this.handleShutterColorChange(i, event)}
                                                    >
                                                        <option disabled value={""}>Select a color</option>
                                                        {
                                                            this.state.shutterColors.map((color, i) =>
                                                                <option key={i} value={color.color}>{color.color}</option>
                                                            )
                                                        }
                                                    </select>
                                                    {
                                                        this.state.error.order.windows[i].shutter.color &&
                                                        <div className="error-desc">Invalid value!</div>
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div className={ this.state.error.order.windows[i].shutter.material === true
                                                    ? "form-group has-error"
                                                    : this.state.error.order.windows[i].shutter.material === false
                                                        ? "form-group has-success"
                                                        : "form-group"
                                                }
                                                >
                                                    <select
                                                        className="form-control"
                                                        value={window.shutter.material}
                                                        onChange={(event) => this.handleShutterMaterialChange(i, event)}
                                                    >
                                                        <option disabled value={""}>Select a material</option>
                                                        {
                                                            this.state.shutterMats.map((material, i) =>
                                                                <option key={i} value={material.material}>{material.material}</option>
                                                            )
                                                        }
                                                    </select>
                                                    {
                                                        this.state.error.order.windows[i].shutter.material &&
                                                        <div className="error-desc">Invalid value!</div>
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-block"
                                                    onClick={() => this.deleteShutter(i)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>

                        <div className={'col-sm-6'}>
                            <div className="form-group">
                                <label>Notes:</label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    value={this.state.order.notes}
                                    onChange={this.handleNotesChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </div>


                    </div>
                </div>
            </form>
        )
    }
}
