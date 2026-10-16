const activityService = require('../services/activity.service');

function getActivity(req, res) {
  const x = activityService.getAllActivity();
  res.json(x);
}

function addActivity(req, res) {
  const bodyData = req.body || {};
  const made = activityService.createNewActivity(bodyData);
  res.status(201).json(made);
}

module.exports = {
  getActivity,
  addActivity,
};
