// controllers/emissionController.js
const { Emission } = require('../models/db');

const getAllEmissions = async () => {
  try {
    const emissions = await Emission.find();
    return emissions;
  } catch (error) {
    console.error('Error fetching emissions:', error);
    throw error;
  }
};

const addEmission = async (data) => {
  try {
    const newEmission = new Emission(data);
    await newEmission.save();
    return newEmission;
  } catch (error) {
    console.error('Error adding emission:', error);
    throw error;
  }
};

const deleteEmission = async (emissionId) => {
  try {
    const deletedEmission = await Emission.findByIdAndDelete(emissionId);
    return deletedEmission;
  } catch (error) {
    console.error('Error deleting emission:', error);
    throw error;
  }
};

module.exports = { getAllEmissions, addEmission, deleteEmission };
