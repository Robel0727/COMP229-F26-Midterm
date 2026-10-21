/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';

const app = express();
app.use(express.json());

let equipment = [
  { name: 'USB Microphone', category: 'audio', brand: 'AudioLab', year: 2021, quantity: 5 },
  { name: 'LED Panel', category: 'lighting', brand: 'BrightWorks', year: 2022, quantity: 4 },
  { name: 'Network Switch', category: 'networking', brand: 'NetCore', year: 2020, quantity: 3 },
  { name: 'Cable Tester', category: 'tools', brand: 'TestPro', year: 2019, quantity: 6 },
  { name: 'Studio Headphones', category: 'audio', brand: 'SoundCraft', year: 2023, quantity: 8 },
  { name: 'Portable Projector', category: 'presentation', brand: 'Epson', year: 2023, quantity: 3 },
  { name: 'Portable Bluetooth Speaker', category: 'audio', brand: 'JBL', year: 2024, quantity: 4 }
];

// 1. Get all equipment
app.get('/api/equipment', (req, res) => {
  res.json(equipment);
});

// 2. Filter equipment by category
app.get('/api/equipment/filter', (req, res) => {
  const category = req.query.category;

  const results = equipment.filter(
    item => item.category.toLowerCase() === (category || '').toLowerCase()
  );

  res.json(results);
});

// 3. Get one equipment item by ID
app.get('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 0 || id >= equipment.length) {
    return res.status(404).json({ message: 'Equipment not found' });
  }

  res.json(equipment[id]);
});

// 4. Add equipment
app.post('/api/equipment', (req, res) => {
  const { name, category, brand, year, quantity } = req.body;

  if (!name || !category || !brand || !Number.isInteger(year) ||
      !Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ message: 'Invalid equipment data' });
  }

  const newItem = { name, category, brand, year, quantity };
  equipment.push(newItem);

  res.status(201).json(newItem);
});

// 5. Update equipment
app.put('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 0 || id >= equipment.length) {
    return res.status(404).json({ message: 'Equipment not found' });
  }

  const { name, category, brand, year, quantity } = req.body;

  if (!name || !category || !brand || !Number.isInteger(year) ||
      !Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ message: 'Invalid equipment data' });
  }

  equipment[id] = { name, category, brand, year, quantity };

  res.json(equipment[id]);
});

// 6. Delete equipment
app.delete('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 0 || id >= equipment.length) {
    return res.status(404).json({ message: 'Equipment not found' });
  }

  const deletedItem = equipment.splice(id, 1);

  res.json({ message: 'Equipment deleted', equipment: deletedItem[0] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
