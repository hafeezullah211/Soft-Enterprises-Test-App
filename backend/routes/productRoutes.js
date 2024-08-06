const express = require('express');
const { addProduct, getUserProducts } = require('../controllers/productController');
const { protect } = require('../middelware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/add', protect, upload.array('pictures', 6), addProduct);
router.get('/user-products', protect, getUserProducts);

module.exports = router;