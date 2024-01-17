// routes/emissionRoutes.js
const express = require('express');
const { getAllEmissions, addEmission, deleteEmission } = require('../contollers/emissionController');

const router = express.Router();

// GET all emissions
router.get('/', async (req, res) => {
  try {
    const emissions = await getAllEmissions();
    res.json(emissions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new emission
router.post('/', async (req, res) => {
  const { pollutant, value } = req.body;
  try {
    const newEmission = await addEmission({ pollutant, value });
    res.json(newEmission);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE an emission
router.delete('/:id', async (req, res) => {
  const emissionId = req.params.id;
  try {
    const deletedEmission = await deleteEmission(emissionId);
    res.json(deletedEmission);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
