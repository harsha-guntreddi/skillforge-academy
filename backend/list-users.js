require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

(async()=>{
  try {
    console.log('Connecting to:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log('Mongoose connected');
    const users = await User.find({});
    console.log('Users found:', users);
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
