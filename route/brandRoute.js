const mongoose = require("mongoose");
const express = require('express')
const path = require('path');
const multer = require('multer');
const fs = require('fs');  // Add the 'fs' module to handle file system operations
const{addBrand} = require('../controller/brandController')
const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/brand');

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


/**api start here**/
router.post('/add-brand' , upload.array('image') , addBrand )

module.exports = router