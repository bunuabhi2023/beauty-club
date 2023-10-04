const Category = require('../models/category');
const ErrorHandler = require("../utils/ErrorHandler");

exports.createCategory = async(req, res, next) =>{
    const { name, gender} = req.body;

    const file = req.s3FileUrl;

    if (!file) {
        return next(new ErrorHandler("No file provided", 400));
    }


      const newCategory = new Category({ name, gender, file });

      try {
        const savedCategory = await newCategory.save();
        console.log(savedCategory);
        res.json(savedCategory);
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Failed to create category", 500));
      }
};

exports.updateCategory = async (req, res, next) => {
 

    const { name, gender, priority } = req.body;

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



// Function to get all categories
exports.getAllCategories = async (req, res, next)  => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to fetch categories', 500));
    }
};
  
  // Function to get a category by ID
exports.getCategoryById = async (req, res, next) => {
try {
    const category = await Category.findById(req.params.id);
    if (!category) {
    console.log(`Category with ID ${req.params.id} not found`);
    return next(new ErrorHandler('Category not found', 404));
    }

    res.json(category);
} catch (error) {
    console.error(error);
    return next(new ErrorHandler('Failed to fetch category', 500));
}
};
  
  // Function to delete a category by ID
exports.deleteCategory = async (req, res, next) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        console.log(`Category with ID ${req.params.id} not found`);
        return next(new ErrorHandler('Category not found', 404));
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Failed to delete category', 500));
    }
};