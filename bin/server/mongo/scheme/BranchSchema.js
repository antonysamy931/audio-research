const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BranchScheme = new Schema({
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
        required: true,
    },
    CustomerId: {
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
    Active:{
        type: Number,
        default: 1
    },
    Address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    }
});

BranchScheme.indexes({ID: 1});

var Branch = mongoose.model("Branch", BranchScheme);

module.exports = Branch;