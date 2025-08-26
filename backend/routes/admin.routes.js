const express = require('express');
const router = express.Router();
const AboutmeController = require('../controllers/about_me.controller');

// GET /api/aboutme
router.get('/aboutme', AboutmeController.getAll);

// POST /api/aboutme
router.post('/aboutme', AboutmeController.create);

// PUT /api/aboutme/:id
router.put('/aboutme/:id', AboutmeController.update);

// DELETE /api/aboutme/:id
router.delete('/aboutme/:id', AboutmeController.delete);

module.exports = router;
