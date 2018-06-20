var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    ID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    CreatedBy: String,
    CreatedDate: {
        type: Date
    },
    UpdatedBy: String,
    UpdatedDate:{
        type: Date
    },
    Address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    Branchs: [{
        type: Schema.Types.ObjectId,
        ref: "Branch"        
    }],
    CustomerGroups: [{
        type: Schema.Types.ObjectId,
        ref: "CustomerGroup"
    }]
});

CustomerSchema.indexes({ID: 1});
var Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;