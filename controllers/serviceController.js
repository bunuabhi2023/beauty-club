const Service = require('../models/service');
const ErrorHandler = require("../utils/ErrorHandler");

exports.createService = async (req, res, next) => {
    const { name, categoryId, subCategoryId, price, duration, description } = req.body;
    const authenticatedUser = req.user;

    let vendorId = null; // Initialize vendorId with null

    if (authenticatedUser.role === 'Vendor') {
        if (authenticatedUser.status === 'inactive' || authenticatedUser.status === 'rejected') {
            return next(new ErrorHandler("Your Profile Is not active yet! Please ask the Admin for approval.", 409));
        }
        vendorId = authenticatedUser._id;
    }

    let fileUrl = null; // Initialize fileUrl with null

    if (req.file && !empty(req.file)) {
        fileUrl = req.s3FileUrl;
    }

    const newService = new Service({
        name,
        categoryId,
        subCategoryId,
        userId: vendorId,
        price,
        duration,
        description,
        file: fileUrl
    });

    try {
        const savedService = await newService.save();
        console.log(savedService);
        res.json(savedService);
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Failed to create service", 500));
    }
};


exports.updateService = async (req, res, next) => {
 
    const { name, categoryId, subCategoryId, price, duration, description} = req.body;

    try {
      const categoryToUpdate = await Category.findById(req.params.id);

      if (!categoryToUpdate) {
        console.log(`Category with ID ${req.params.id} not found`);
        return next(new ErrorHandler('Category not found', 404));
      }

      let fileUrl = categoryToUpdate.file; // Default to the existing image URL

      if (req.file) {
       const newfile = req.s3FileUrl;
        fileUrl = newfile;
      }

      // Update the category with the new data and image URL
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name, gender, priority, file: fileUrl, updatedAt: Date.now() },
        { new: true }
      );

      console.log(updatedCategory); // Add this line for debug logging
      res.json(updatedCategory);
    } catch (error) {
      console.error(error); // Add this line for debug logging
      return next(new ErrorHandler('Failed to update category', 500));
    }
};

exports.getAllServices = async (req, res, next)  => {
    try {
        const serices = await Service.find()
        .populate('userId', 'name')
        .populate('categoryId', 'name')
        .populate('subCategoryId', 'name')
        .exec();
        res.json(serices);
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to fetch serices', 500));
    }
};

exports.deleteService = async (req, res, next) => {
    const authenticatedUser = req.user;
    
    try {
     if(authenticatedUser.role == 'Admin'){
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            console.log(`Service with ID ${req.params.id} not found`);
            return next(new ErrorHandler('Service not found', 404));
        }
     }
     if(authenticatedUser.role == 'Vendor'){
        const deletedService = await Service.findOneAndDelete({_id:req.params.id, userId:authenticatedUser._id});
        if (!deletedService) {
            console.log(`Service with ID ${req.params.id} not found`);
            return next(new ErrorHandler('Service not found', 404));
        }
     }
     res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Failed to delete Service', 500));
    }
};