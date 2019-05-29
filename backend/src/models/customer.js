function Customer(name, tel, address) {
    if(name === undefined || typeof name !== 'string' || name.trim() === "" ) {
        throw "Error! Name must be a defined string and not empty!";
    }
    if(tel === undefined || typeof tel !== 'string' || tel.trim() === "") {
        throw "Error! Tel must be a defined string and not empty!";
    }
    if(address === undefined || typeof address !== 'string' || address.trim() === "") {
        throw "Error! Address must be a defined string and not empty!";
    }

    this.name =  name;
    this.tel =  tel;
    this.address = address;
}

function CustomerFromJson(customer) {
    if(customer === undefined) {
        throw "Error! Customer must be defined!";
    }

    return new Customer(customer.name, customer.tel, customer.address);
}

module.exports = {
    Customer: Customer,
    CustomerFromJson: CustomerFromJson
};