const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AddressSchema = new Schema({
    AddressLine1: {
        type: String
    },
    AddressLine2: {
        type: String
    },
    City: {
        type: String
    },
    State: {
        type: String
    },
    CustomerId: {
        type: String
    },
    BranchId: {
        type: String
    }
});

var Address = mongoose.model("Address", AddressSchema);

module.exports = Address;