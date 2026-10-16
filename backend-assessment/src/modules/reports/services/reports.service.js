const path = require('node:path');

const { readJsonArray } = require('../../../utils/jsonStore');

const TASKS_FILE_PATH = path.join(process.cwd(), 'data', 'tasks.json');
const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

async function getTasksSummary() {
  const [tasks, activities] = await Promise.all([
    readJsonArray(TASKS_FILE_PATH),
    readJsonArray(ACTIVITY_FILE_PATH),
  ]);

  return {
    total: tasks.length,
    byStatus: {
      todo: tasks.filter((task) => task.completed === false).length,
      'in-progress': 0,
      done: tasks.filter((task) => task.completed === true).length,
    },
    recentActivityCount: activities.length,
  };
}

module.exports = {
  getTasksSummary,
};
