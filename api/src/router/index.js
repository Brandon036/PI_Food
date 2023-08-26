const { Router } = require('express');
const express = require('express');
const axios = require('axios');
const dogRouter = require('./dogRouter.js');
const temperamentRouter = require('./temperamentRouter.js');

const router = Router();

router.use(express.json());

router.use('/dogs', dogRouter);
router.use('/temperament', temperamentRouter);

module.exports = router;
