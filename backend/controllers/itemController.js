const Item = require('../models/Item');

const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

const getItemByName = async (req, res) => {
  const { name } = req.query;
  const item = await Item.find({ name: { $regex: name, $options: 'i' } });
  res.json(item);
};

const getCheapestItem = async (req, res) => {
  const { item } = req.query;
  const cheapest = await Item.find({ name: { $regex: item, $options: 'i' } }).sort({ price: 1 }).limit(1);
  res.json(cheapest);
};

const filterItems = async (req, res) => {
  const { store, sort } = req.query;
  let query = {};
  if (store) query.store = store;
  
  const items = await Item.find(query).sort({ price: sort === 'asc' ? 1 : -1 });
  res.json(items);
};

module.exports = { getItems, getItemByName, getCheapestItem, filterItems };
