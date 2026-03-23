const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// LOCAL MongoDB connection
mongoose.connect('mongodb://localhost:27017/factsdb')
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

const FactSchema = new mongoose.Schema({ text: String });
const Fact = mongoose.model('Fact', FactSchema);

// Add 5 facts automatically (runs once)
async function addFacts() {
  const count = await Fact.countDocuments();
  if (count === 0) {
    await Fact.insertMany([
      { text: "Cats sleep 16 hours a day!" },
      { text: "Bananas are berries!" },
      { text: "Octopuses have 3 hearts!" },
      { text: "Honey never spoils!" },
      { text: "A day on Venus = 243 Earth days!" }
    ]);
    console.log('Added 5 facts!');
  }
}
addFacts();

app.get('/facts', async (req, res) => {
  const facts = await Fact.find();
  res.json(facts);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
