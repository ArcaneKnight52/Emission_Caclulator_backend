// models/db.js
const mongoose = require('mongoose');

const emissionSchema = new mongoose.Schema({
  pollutant: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Emission = mongoose.model('Emission', emissionSchema);

module.exports = { Emission };
