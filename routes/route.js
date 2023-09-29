const express  = require("express");
const router = express.Router();

const userController = require('../controllers/userController');


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


module.exports = router;