const Service = require('../models/Service');

// Browse services (search, filter)
exports.browseServices = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    const services = await Service.find(query);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
