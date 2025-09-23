const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  lead: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Planning', enum: ['Planning', 'Active', 'Completed', 'On Hold'] },
  budget: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);