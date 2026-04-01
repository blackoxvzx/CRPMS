const db = require('../config/db');

const createCar = (req, res) => {
    try {
        const { PlateNumber, type, Model, ManufacturingYear, DriverPhone, MechanicName } = req.body;
        const sql = 'INSERT INTO Car (PlateNumber, type, Model, ManufacturingYear, DriverPhone, MechanicName) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [PlateNumber, type, Model, ManufacturingYear, DriverPhone, MechanicName];
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Car created', data: result });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCars = (req, res) => {
    try {
        const sql = 'SELECT * FROM Car';
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ data: result });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCar = (req, res) => {
    try {
        const { PlateNumber } = req.params;
        const { type, Model, ManufacturingYear, DriverPhone, MechanicName } = req.body;
        const sql = 'UPDATE Car SET type = ?, Model = ?, ManufacturingYear = ?, DriverPhone = ?, MechanicName = ? WHERE PlateNumber = ?';
        const values = [type, Model, ManufacturingYear, DriverPhone, MechanicName, PlateNumber];
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.json({ message: 'Car updated', data: result });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCar = (req, res) => {
    try {
        const { PlateNumber } = req.params;
        const sql = 'DELETE FROM Car WHERE PlateNumber = ?';
        const values = [PlateNumber];
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.json({ message: 'Car deleted', data: result });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCar,
    getAllCars,
    updateCar,
    deleteCar
};
