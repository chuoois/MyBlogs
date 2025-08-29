const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middeware');
const AboutmeController = require('../controllers/about_me.controller');
const ProjectController = require('../controllers/project.controller');
const BlogController = require('../controllers/blog.controller');

// GET /api/aboutme
router.get('/aboutme', AboutmeController.getAll);

// POST /api/aboutme
router.post('/aboutme', authenticateToken, AboutmeController.create);

// PUT /api/aboutme/:id
router.put('/aboutme/:id', authenticateToken, AboutmeController.update);

// DELETE /api/aboutme/:id
router.delete('/aboutme/:id', authenticateToken, AboutmeController.delete);

// GET /api/projects
router.get('/projects', ProjectController.getAll);

// POST /api/projects
router.post('/projects', authenticateToken, ProjectController.create);

// PUT /api/projects/:id
router.put('/projects/:id', authenticateToken, ProjectController.update);

// DELETE /api/projects/:id
router.delete('/projects/:id', authenticateToken, ProjectController.delete);

// GET /api/blogs
router.get('/blogs', BlogController.getAll);

// GET /api/blogs/:id
router.get('/blogs/:id', BlogController.getById);

// POST /api/blogs
router.post('/blogs', authenticateToken, BlogController.create);

// PUT /api/blogs/:id
router.put('/blogs/:id', authenticateToken, BlogController.update);

// DELETE /api/blogs/:id
router.delete('/blogs/:id', authenticateToken, BlogController.delete);

module.exports = router;