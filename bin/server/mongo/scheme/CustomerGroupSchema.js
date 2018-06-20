const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var CustomerGroupSchema = new Schema({
    ID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    CustomerId:{
        type: String,
        required: true
    },
    Branches: [{
        type: Schema.Types.ObjectId,
        ref: "Branch"
    }]
});

CustomerGroupSchema.indexes({ID: 1});

var CustomerGroup = mongoose.model("CustomerGroup", CustomerGroupSchema);

module.exports = CustomerGroup;

