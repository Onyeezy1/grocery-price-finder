const express = require('express');
const router = express.Router();
const { getItems, getItemByName, getCheapestItem, filterItems } = require('../controllers/itemController');

router.get('/', getItems);
router.get('/search', getItemByName);
router.get('/cheapest', getCheapestItem);
router.get('/filter', filterItems);

module.exports = router;
