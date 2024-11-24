const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hospitalDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Patient Schema
const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    status: String
});

const Patient = mongoose.model('Patient', patientSchema);

// Routes
app.get('/api/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/patients', async (req, res) => {
    const patient = new Patient({
        name: req.body.name,
        age: req.body.age,
        department: req.body.department,
        status: 'Active'
    });

    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        patient.status = patient.status === 'Active' ? 'Discharged' : 'Active';
        const updatedPatient = await patient.save();
        res.json(updatedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
