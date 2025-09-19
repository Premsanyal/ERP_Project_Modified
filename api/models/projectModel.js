const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  lead: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Planning' },
  budget: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);