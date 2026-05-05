const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, default: 'milestone' }, // milestone, phase, launch
  imageUrl: { type: String },
  order: { type: Number, required: true } // 0 for oldest, higher for newer
}, { timestamps: true });

module.exports = mongoose.model('TimelineEvent', timelineEventSchema);
