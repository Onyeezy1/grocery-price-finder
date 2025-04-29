const Item = require('../models/Item');

const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

const getItemByName = async (req, res) => {
  const { name } = req.query;
  try {
    const items = await Item.find({
      name: { $regex: new RegExp(name, 'i') } // case-insensitive regex
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getCheapestItem = async (req, res) => {
  const { item } = req.query;
  try {
    const cheapest = await Item.find({
      name: { $regex: new RegExp(item, 'i') }
    }).sort({ price: 1 }).limit(1);
    res.json(cheapest);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const filterItems = async (req, res) => {
  const { store, sort } = req.query;
  try {
    let query = {};
    if (store) query.store = store;

    const items = await Item.find(query).sort({
      price: sort === 'asc' ? 1 : -1
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getItems, getItemByName, getCheapestItem, filterItems };
