function Invoice(price, isPaid) {
    if(price === undefined || typeof price !== 'number' || price < 0) {
        throw "Error! Price must be a defined positive number!";
    }
    if(isPaid === undefined || typeof isPaid !== 'boolean') {
        throw "Error! IsPaid must be a defined boolean!"
    }

    this.price = price;
    this.isPaid = isPaid;
}

function InvoiceFromJson(invoice) {
    if(invoice === undefined) {
        throw "Error! Invoice cannot be undefined!";
    }

    return new Invoice(invoice.price, invoice.isPaid);
}

module.exports = {
    Invoice: Invoice,
    InvoiceFromJson: InvoiceFromJson
};
