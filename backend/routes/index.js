const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');

router.use(authRoutes);
router.use(adminRoutes);

module.exports = router;