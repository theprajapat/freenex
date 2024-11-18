
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: String, required: true },
  budget: { type: Number, required: true },
});

module.exports = mongoose.model('Project', projectSchema);
