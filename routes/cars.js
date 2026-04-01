const express = require('express');
const router = express.Router();
const { createCar, getAllCars, updateCar, deleteCar } = require('../controllers/carController');

router.post('/', createCar);
router.get('/', getAllCars);
router.put('/:PlateNumber', updateCar);
router.delete('/:PlateNumber', deleteCar);

module.exports = router;
