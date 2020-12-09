var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const reviewController = require('../controllers/ReviewController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

router.get('/product/:productId', reviewController.getReviewByProduct)

router.post('/', reviewController.postReview)

router.delete('/:id', reviewController.deleteReview)


module.exports = router;
