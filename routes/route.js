const express  = require("express");
const router = express.Router();

const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const subCategegoryController = require('../controllers/subCategoryController');
const serviceController = require('../controllers/serviceController');




const {auth, isAdmin, isVendor}  = require('../middlewares/Auth');

const {customerAuth} = require('../middlewares/CustomerAuth');
const { imageSingleUpload } = require("../middlewares/multer");
// Home 
router.get("/", (req, res) =>{
    res.send("Welcome to Beauty Club Backend");
});

//Admin Route//
router.post("/register-user", userController.signUp);
router.post("/login-user", userController.login);
router.get("/my-profile", auth, userController.getMyProfile);//auth
router.put("/update-user/:id", imageSingleUpload, auth, isAdmin, userController.updateUser);
router.put("/update-my-profile", imageSingleUpload, auth, userController.updateMyProfile);
router.put("/update-user-status/:id", auth, isAdmin, userController.updateUserStatus);
router.get("/get-all-users", auth, isAdmin, userController.getUser);
router.get("/get-user-by-id/:id", auth, isAdmin, userController.getUserById);
router.delete("/delete-user/:id", auth, isAdmin, userController.deleteUser);

//Category Route//
router.post("/create-category", imageSingleUpload, auth, isAdmin, categoryController.createCategory);
router.put('/update-category/:id', imageSingleUpload, auth, isAdmin, categoryController.updateCategory);
router.get("/get-category", categoryController.getAllCategories);
router.get('/get-category-by-id/:id', categoryController.getCategoryById);
router.delete('/delete-category/:id', auth, isAdmin, categoryController.deleteCategory);

//SubCategory Route//
router.post("/create-subcategory", imageSingleUpload, auth, isAdmin, subCategegoryController.createSubCategory);
router.put('/update-subcategory/:id', imageSingleUpload, auth, isAdmin, subCategegoryController.updateSubCategory);
router.get("/get-subcategory", subCategegoryController.getAllSubCategories);
router.get('/get-subcategory-by-id/:id', subCategegoryController.getSubCategoryById);
router.get('/get-subcategory-by-category/:id', subCategegoryController.getSubCategoryByCategory);
router.delete('/delete-subcategory/:id', auth, isAdmin, subCategegoryController.deleteSubCategory);

//Service Route//
router.post("/create-service", imageSingleUpload, auth, serviceController.createService);
router.get("/get-services", serviceController.getAllServices);
router.delete('/delete-service/:id', auth, serviceController.deleteService);


module.exports = router;