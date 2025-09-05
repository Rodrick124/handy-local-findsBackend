const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, Admin, Seeker, Provider } = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/handy-local-finds');
  await User.deleteMany({});
  await Service.deleteMany({});
  await Booking.deleteMany({});

  // Create admin
  const admin = new Admin({
    name: 'Admin User',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
  });
  await admin.save();

  // Create providers
  const provider1 = new User({
    name: 'Provider One',
    email: 'provider1@example.com',
    password: await bcrypt.hash('provider123', 10),
    role: 'provider',
  });
  const provider2 = new User({
    name: 'Provider Two',
    email: 'provider2@example.com',
    password: await bcrypt.hash('provider123', 10),
    role: 'provider',
  });
  await provider1.save();
  await provider2.save();

  // Create seekers
  const seeker1 = new Seeker({
    name: 'Seeker One',
    email: 'seeker1@example.com',
    password: await bcrypt.hash('seeker123', 10),
  });
  const seeker2 = new Seeker({
    name: 'Seeker Two',
    email: 'seeker2@example.com',
    password: await bcrypt.hash('seeker123', 10),
  });
  await seeker1.save();
  await seeker2.save();

  // Create services
  const service1 = new Service({
    name: 'Plumbing',
    description: 'Fix leaks and install pipes',
    category: 'Home',
    price: 50,
    provider: provider1._id,
  });
  const service2 = new Service({
    name: 'Cleaning',
    description: 'House cleaning service',
    category: 'Home',
    price: 30,
    provider: provider2._id,
  });
  await service1.save();
  await service2.save();

  // Create bookings
  const booking1 = new Booking({
    seeker: seeker1._id,
    provider: provider1._id,
    service: service1._id,
    scheduledDate: new Date(),
    status: 'pending',
  });
  await booking1.save();

  console.log('Seed data created!');
  mongoose.connection.close();
}

seed();
