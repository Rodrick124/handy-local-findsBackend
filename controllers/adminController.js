const { User } = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

// Create service
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all services
exports.listServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List users by role
exports.listUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const users = await User.find(role ? { role } : {});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Analytics
exports.getSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalSeekers = await User.countDocuments({ role: 'seeker' });
    const totalProviders = await User.countDocuments({ role: 'provider' });
    const totalServices = await Service.countDocuments({});
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    const monthlyBookings = await Booking.aggregate([
      { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      totalUsers,
      totalSeekers,
      totalProviders,
      totalServices,
      completedBookings,
      monthlyBookings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserSignups = async (req, res) => {
  try {
    const userSignups = await User.aggregate([
      { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, role: '$role' }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $project: { _id: 0, year: '$_id.year', month: '$_id.month', role: '$_id.role', count: 1 } }
    ]);

    // Format for chart: [ { name: "Jan 2023", Seekers: 10, Providers: 2 }, ... ]
    const formattedSignups = {};
    userSignups.forEach(signup => {
      const date = new Date(signup.year, signup.month - 1);
      const monthName = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!formattedSignups[monthName]) {
        formattedSignups[monthName] = { name: monthName };
      }
      formattedSignups[monthName][signup.role === 'seeker' ? 'Seekers' : 'Providers'] = signup.count;
    });

    res.json(Object.values(formattedSignups));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProviderRankings = async (req, res) => {
  try {
    const providerRankings = await Booking.aggregate([
      { $group: { _id: '$provider', bookings: { $sum: 1 } } },
      { $sort: { bookings: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'providerInfo' } },
      { $unwind: '$providerInfo' },
      { $project: { _id: 0, name: '$providerInfo.name', bookings: 1 } }
    ]);
    res.json(providerRankings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookingStats = async (req, res) => {
  try {
    const bookingStats = await Booking.aggregate([
      { $group: { _id: '$status', value: { $sum: 1 } } },
      { $project: { _id: 0, name: '$_id', value: 1 } }
    ]);
    res.json(bookingStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
