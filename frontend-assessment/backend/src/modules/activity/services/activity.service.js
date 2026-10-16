const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(process.cwd(), 'data', 'activity.json');

function loadDataActivity() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }

  let raw = fs.readFileSync(filePath, 'utf8');
  if (!raw) {
    raw = '[]';
  }

  return JSON.parse(raw);
}

function getAllActivity() {
  const arr = loadDataActivity();
  return arr;
}

function createNewActivity(activityData) {
  const list = loadDataActivity();
  const newActivity = {
    id: String(Date.now()),
    action: activityData.action,
    info: activityData.info,
    when: new Date().toISOString(),
  };

  list.push(newActivity);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
  return newActivity;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
