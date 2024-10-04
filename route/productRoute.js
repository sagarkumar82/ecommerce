const express = require("express");
const path = require('path');
const multer = require('multer');
const fs = require('fs');  // Add the 'fs' module to handle file system operations
const router = express.Router();
const { addProduct , getProductById , updateProduct , getAllProduct} = require('../controller/productController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/product');

        // Check if the directory exists; if not, create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath); // Save the file in the 'uploads/product' folder
    },
    filename: (req, file, cb) => {
        // Use the original file name from the upload
        cb(null, Date.now() +"-" + file.originalname.replace(" " , "-")); // Store the file with the original name
    },
});

const upload = multer({ storage });

router.post('/product', upload.single('image'), addProduct);
router.get('/all-product',  getAllProduct);
router.get('/product/:id', getProductById);
router.put('/update-product/:id',upload.single('image') , updateProduct);

module.exports = router;
