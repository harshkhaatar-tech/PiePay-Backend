const express = require('express');
const router = express.Router();
const {createOffers} = require('../controllers/offerController');

router.post('/offers', createOffers);
router.get('/highest-discount', getHighestDiscount);


module.exports = router;
