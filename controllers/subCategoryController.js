const SubCategory = require('../models/subCategegory');
const ErrorHandler = require("../utils/ErrorHandler");

const createSubCategory = async(req, res, next) =>{
    const { name, categoryId} = req.body;

      const newSubCategory = new SubCategory({ name, categoryId});

      try {
        const savedSubCategory = await newSubCategory.save();
        console.log(savedSubCategory);
        res.json(savedSubCategory);
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Failed to create subcategory", 500));
      }
};

const updateSubCategory = async (req, res, next) => {
 

    const { name, categoryId} = req.body;

    try {
      const subcategoryToUpdate = await SubCategory.findById(req.params.id);

      if (!subcategoryToUpdate) {
        console.log(`SubCategory with ID ${req.params.id} not found`);
        return next(new ErrorHandler('SubCategory not found', 404));
      }

      // Update the category with the new data and image URL
      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        { name, categoryId, updatedAt: Date.now() },
        { new: true }
      );

      console.log(updatedSubCategory); // Add this line for debug logging
      res.json(updatedSubCategory);
    } catch (error) {
      console.error(error); // Add this line for debug logging
      return next(new ErrorHandler('Failed to update subcategory', 500));
    }
  };



// Function to get all categories
const getAllSubCategories = async (req, res, next)  => {
    try {
        const subcategories = await SubCategory.find();
        res.json(subcategories);
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to fetch subcategories', 500));
    }
};
  
  // Function to get a category by ID
const getSubCategoryById = async (req, res, next) => {
try {
    const subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory) {
    console.log(`subcategory with ID ${req.params.id} not found`);
    return next(new ErrorHandler('subcategory not found', 404));
    }

    res.json(subcategory);
} catch (error) {
    console.error(error);
    return next(new ErrorHandler('Failed to fetch subcategory', 500));
}
};

const getSubCategoryByCategory = async (req, res, next) => {
    try {
        const subcategory = await SubCategory.find({categoryId:req.params.id});
        if (!subcategory) {
        console.log(`subcategory with ID ${req.params.id} not found`);
        return next(new ErrorHandler('subcategory not found', 404));
        }
    
        res.json(subcategory);
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to fetch subcategory', 500));
    }
};
  
  // Function to delete a category by ID
const deleteSubCategory = async (req, res, next) => {
    try {
      const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);
      if (!deletedSubCategory) {
        console.log(`SubCategory with ID ${req.params.id} not found`);
        return next(new ErrorHandler('SubCategory not found', 404));
      }
      res.json({ message: 'SubCategory deleted successfully' });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Failed to delete subcategory', 500));
    }
};

module.exports ={
    createSubCategory,
    updateSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    deleteSubCategory,
    getSubCategoryByCategory
}
