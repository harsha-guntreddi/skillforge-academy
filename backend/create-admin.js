require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

(async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log('Mongoose connected');

    const email = 'admin_debug@example.com';
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists');
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const newAdmin = new User({
      name: 'Debug Admin',
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();
    console.log('Created admin:', newAdmin);
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
