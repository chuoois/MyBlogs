const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const { authenticateToken } = require('../middleware/auth.middeware');

router.use(authRoutes);
router.use(authenticateToken, adminRoutes);

module.exports = router;