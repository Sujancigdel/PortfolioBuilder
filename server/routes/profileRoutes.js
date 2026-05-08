const express = require('express');
const router = express.Router();
const { getProfile, saveProfile } = require('../controllers/profileController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, getProfile);
router.post('/', authenticateToken, saveProfile);

module.exports = router;
