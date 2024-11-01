// routes/eventRoutes.js
const express = require('express');
const Event = require('../models/event');

const router = express.Router();

// GET /events?id=:event_id
router.get('/events', async (req, res) => {
    try {
        const { id } = req.query;
        const event = await Event.findById(id);
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /events?type=latest&limit=5&page=1
router.get('/events', async (req, res) => {
    try {
        const { type, limit = 5, page = 1 } = req.query;
        const events = await Event.find().sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /events
router.post('/events', async (req, res) => {
    const event = new Event(req.body);
    try {
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /events/:id
router.put('/events/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /events/:id
router.delete('/events/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
