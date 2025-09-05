const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Make payment for booking (mock)
exports.makePayment = async (req, res) => {
  try {
    const { bookingId, amount, method } = req.body;
    // Simulate payment
    const payment = new Payment({
      booking: bookingId,
      amount,
      status: 'paid',
      method: method || 'mock',
      transactionId: 'TXN-' + Date.now(),
    });
    await payment.save();
    // Link payment to booking
    await Booking.findByIdAndUpdate(bookingId, { payment: payment._id });
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get payment details
exports.getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findOne({ booking: req.params.bookingId });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
