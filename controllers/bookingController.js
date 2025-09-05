const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Payment = require('../models/Payment');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { serviceId, providerId, scheduledDate } = req.body;
    const booking = new Booking({
      seeker: req.user.id,
      provider: providerId,
      service: serviceId,
      scheduledDate,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get seeker's bookings
exports.getSeekerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ seeker: req.user.id }).populate('service provider payment');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get provider's assigned bookings
exports.getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user.id }).populate('service seeker payment');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
