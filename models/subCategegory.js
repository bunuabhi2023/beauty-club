const mongoose = require("mongoose");

const subcategories = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "please Enter Category Name"],
            maxLength:255,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required:false,
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("SubCategory", subcategories);