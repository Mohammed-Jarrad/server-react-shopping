const express = require('express');
const { authRequest } = require('../Middleware/authMiddleware');
const router = express.Router();
const reviewController = require('../controller/reviewController');

router.post('/review', authRequest, reviewController.createReview);
router.put('/review/:id', authRequest, reviewController.updateReview);
router.delete('/review/:id', authRequest, reviewController.deleteReview);
router.get('/reviews/product/:id', authRequest, reviewController.getProductReviews);

module.exports = router;
