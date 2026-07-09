const mongoose = require('mongoose');
(async()=>{
  try {
    await mongoose.connect('mongodb://harsh_db_user_1432:Harsha%401432@ac-drc3qss-shard-00-00.stfdjpb.mongodb.net:27017,ac-drc3qss-shard-00-01.stfdjpb.mongodb.net:27017,ac-drc3qss-shard-00-02.stfdjpb.mongodb.net:27017/course_management?tls=true&authSource=admin&replicaSet=atlas-7zk5zt-shard-0&retryWrites=true&w=majority', {
      serverSelectionTimeoutMS: 30000,
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log('Mongoose connected');
    await mongoose.connection.db.admin().ping();
    console.log('Ping ok');
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
