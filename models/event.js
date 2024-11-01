// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: { type: String, default: "event" },
    uid: { type: Number, required: true },
    name: { type: String, required: true },
    tagline: { type: String },
    schedule: { type: Date, required: true },
    description: { type: String },
    files: {
        image: { type: String }, // URL or path to the image
    },
    moderator: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String },
    rigor_rank: { type: Number },
    attendees: { type: [Number], default: [] } // Array of user IDs
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
