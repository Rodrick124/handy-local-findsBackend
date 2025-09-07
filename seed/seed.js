const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, Admin, Seeker, Provider } = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Payment = require('../models/Payment');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/handy-local-finds');
  await User.deleteMany({});
  await Service.deleteMany({});
  await Booking.deleteMany({});
  await Review.deleteMany({});
  await Payment.deleteMany({});

  // Create admin
  const admin = new Admin({
    name: 'Admin User',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
  });
  await admin.save();

  // Create providers
  const provider1 = new Provider({
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: await bcrypt.hash('provider123', 10),
  });
  const provider2 = new Provider({
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: await bcrypt.hash('provider123', 10),
  });
  const provider3 = new Provider({
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: await bcrypt.hash('provider123', 10),
  });
  await provider1.save();
  await provider2.save();
  await provider3.save();

  // Create seekers
  const seeker1 = new Seeker({
    name: 'David Lee',
    email: 'david@example.com',
    password: await bcrypt.hash('seeker123', 10),
  });
  const seeker2 = new Seeker({
    name: 'Eve Davis',
    email: 'eve@example.com',
    password: await bcrypt.hash('seeker123', 10),
  });
  const seeker3 = new Seeker({
    name: 'Frank White',
    email: 'frank@example.com',
    password: await bcrypt.hash('seeker123', 10),
  });
  await seeker1.save();
  await seeker2.save();
  await seeker3.save();

  // Create services
  const service1 = new Service({
    name: 'Advanced Plumbing',
    description: 'Fix complex leaks and install new pipe systems.',
    category: 'Home Repair',
    price: 75,
    provider: provider1._id,
  });
  const service2 = new Service({
    name: 'Deep Cleaning Service',
    description: 'Thorough cleaning for homes and offices.',
    category: 'Cleaning',
    price: 50,
    provider: provider2._id,
  });
  const service3 = new Service({
    name: 'Electrical Wiring',
    description: 'Installation and repair of electrical systems.',
    category: 'Home Repair',
    price: 90,
    provider: provider1._id,
  });
  const service4 = new Service({
    name: 'Gardening & Landscaping',
    description: 'Full garden maintenance and landscape design.',
    category: 'Outdoor',
    price: 60,
    provider: provider3._id,
  });
  const service5 = new Service({
    name: 'Pest Control',
    description: 'Effective solutions for common household pests.',
    category: 'Home Services',
    price: 80,
    provider: provider2._id,
  });
  await service1.save();
  await service2.save();
  await service3.save();
  await service4.save();
  await service5.save();

  // Create bookings
  const booking1 = new Booking({
    seeker: seeker1._id,
    provider: provider1._id,
    service: service1._id,
    scheduledDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
    status: 'completed',
  });
  const booking2 = new Booking({
    seeker: seeker2._id,
    provider: provider2._id,
    service: service2._id,
    scheduledDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
    status: 'completed',
  });
  const booking3 = new Booking({
    seeker: seeker1._id,
    provider: provider3._id,
    service: service4._id,
    scheduledDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
    status: 'pending',
  });
  const booking4 = new Booking({
    seeker: seeker3._id,
    provider: provider1._id,
    service: service3._id,
    scheduledDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
    status: 'accepted',
  });
  const booking5 = new Booking({
    seeker: seeker2._id,
    provider: provider2._id,
    service: service5._id,
    scheduledDate: new Date(Date.now() - 86400000 * 10), // 10 days ago
    status: 'completed',
  });
  await booking1.save();
  await booking2.save();
  await booking3.save();
  await booking4.save();
  await booking5.save();

  // Create payments
  const payment1 = new Payment({
    booking: booking1._id,
    amount: service1.price,
    status: 'paid',
    method: 'mock',
    transactionId: 'TXN-' + Date.now() + '-001',
  });
  const payment2 = new Payment({
    booking: booking2._id,
    amount: service2.price,
    status: 'paid',
    method: 'mock',
    transactionId: 'TXN-' + Date.now() + '-002',
  });
  const payment3 = new Payment({
    booking: booking5._id,
    amount: service5.price,
    status: 'paid',
    method: 'mock',
    transactionId: 'TXN-' + Date.now() + '-003',
  });
  await payment1.save();
  await payment2.save();
  await payment3.save();

  // Create reviews
  const review1 = new Review({
    seeker: seeker1._id,
    service: service1._id,
    rating: 5,
    comment: 'Excellent plumbing work, very professional!',
  });
  const review2 = new Review({
    seeker: seeker2._id,
    service: service2._id,
    rating: 4,
    comment: 'House was sparkling clean, highly recommend.',
  });
  const review3 = new Review({
    seeker: seeker2._id,
    service: service5._id,
    rating: 3,
    comment: 'Pest control was okay, still saw a few bugs.',
  });
  await review1.save();
  await review2.save();
  await review3.save();

  console.log('Seed data created!');
  mongoose.connection.close();
}

seed();