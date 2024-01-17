// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const emissionRoutes = require('./routes/emissionRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_mongodb_url' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/emission_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// API routes
app.use('/api/emissions', emissionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.post('/api/emissions', async (req, res) => {
    try {
      const { pollutant, value } = req.body;
      const emission = new Emission({ pollutant, value });
      await emission.save();
      res.status(201).json(emission);
    } catch (error) {
      console.error('Error creating emission record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all emission records
  app.get('/api/emissions', async (req, res) => {
    try {
      const emissions = await Emission.find().sort({ date: -1 });
      res.json(emissions);
    } catch (error) {
      console.error('Error fetching emission records:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update an emission record
  app.put('/api/emissions/:id', async (req, res) => {
    try {
      const { pollutant, value } = req.body;
      const updatedEmission = await Emission.findByIdAndUpdate(
        req.params.id,
        { pollutant, value },
        { new: true }
      );
      res.json(updatedEmission);
    } catch (error) {
      console.error('Error updating emission record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete an emission record
  app.delete('/api/emissions/:id', async (req, res) => {
    try {
      const deletedEmission = await Emission.findByIdAndDelete(req.params.id);
      res.json(deletedEmission);
    } catch (error) {
      console.error('Error deleting emission record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // ... (more routes and controllers)
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });