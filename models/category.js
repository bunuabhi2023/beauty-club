const mongoose = require("mongoose");

const categories = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "please Enter Category Name"],
            maxLength:255,
        },
        gender: {
            type:String,
            required:[true, "please enter you Email"],
            unique: true,
        },
        file:{
            Bucket:{
                type:String,
                required:false,
                maxLength:255,
            },
            Key:{
                type:String,
                required:false,
                maxLength:255,
            },
            Url:{
                type:String,
                required:false,
                maxLength:255,
            }
        },
        priority:{
            type:Number,
            required:false,
            maxLength:2,
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Category", categories);