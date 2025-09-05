const mongoose = require('mongoose');

const options = {
  discriminatorKey: 'role',
  collection: 'users',
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
}, options);

const User = mongoose.model('User', userSchema);

const Admin = User.discriminator('admin', new mongoose.Schema({}));
const Seeker = User.discriminator('seeker', new mongoose.Schema({}));
const Provider = User.discriminator('provider', new mongoose.Schema({}));

module.exports = { User, Admin, Seeker, Provider };
