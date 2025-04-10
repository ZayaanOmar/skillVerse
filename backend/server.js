const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

//connect to MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//test route
app.get('/api', (req, res) => {
  res.json({ message : 'Hello from the backend!'});
});

////mongodb+srv://2663134:CoP1rG2tZGyFIZr5@cluster0.5xcua1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
