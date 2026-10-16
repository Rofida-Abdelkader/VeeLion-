const express = require('express');
const controllerActivity = require('../controllers/activity.controller');

const activityRouter = express.Router();

activityRouter.get('/', controllerActivity.getActivity);
activityRouter.post('/', controllerActivity.addActivity);

module.exports = activityRouter;
