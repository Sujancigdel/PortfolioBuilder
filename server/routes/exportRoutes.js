const express = require('express');
const router = express.Router();
const { downloadPortfolio } = require('../controllers/exportController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/download/:templateId', authenticateToken, downloadPortfolio);

module.exports = router;
