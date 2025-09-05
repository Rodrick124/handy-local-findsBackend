const Review = require('../models/Review');
const Booking = require('../models/Booking');

// Add review after booking completion
exports.addReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;
    // Optionally check if booking is completed
    const review = new Review({
      seeker: req.user.id,
      service: serviceId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get reviews for a service
exports.getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId }).populate('seeker', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
