

import Symptom from '../models/Symptom.js';
import express from 'express';

const router = express.Router();
// GET /api/diagnostics/symptoms/:part
router.get('/symptoms/:part', async (req, res) => {
  const { part } = req.params;
  const symptoms = await Symptom.find({ bodyPart: part }).populate('specialty');
  res.json(symptoms);
});
// GET /api/diagnostics/symptoms
router.get('/symptoms', async (req, res) => {
  try {
    const symptoms = await Symptom.find(); // بيفترض إن الموديل اسمه Symptom
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching symptoms" });
  }
});

export default router;