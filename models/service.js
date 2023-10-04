const mongoose = require("mongoose");

const services = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "please Enter service Name"],
            maxLength:255,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:false,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required:false,
        },
        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required:false,
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
        price:{
            type:Number,
            required:false,
            maxLength:10,
        },
        duration:{
            type:Number,
            required:false,
            maxLength:10,
        },
        description:{
            type:String,
            required:false,
            maxLength:255,
        },
        isDisplay:{
            type:Boolean,
            required:true,
            default:true,
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Service", services);