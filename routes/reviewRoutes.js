const express = require('express');
const { authRequest } = require('../Middleware/authMiddleware');
const router = express.Router();
const reviewController = require('../controller/reviewController');

router.post('/review', authRequest, reviewController.createReview);
router.get('/reviews/:id', authRequest, reviewController.getReviewsByProduct);
router.put('/review/:id', authRequest, reviewController.updateReview);
router.delete('/review/:id', authRequest, reviewController.deleteReview);

module.exports = router;
