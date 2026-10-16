
# Code Review

## Summary of Changes

### Activity Module
- Renamed `aSvc` to `activityService`.
- Renamed `get_activity` to `getActivity`.
- Renamed `c` to `controllerActivity` in the activity routes.
- Renamed `fp` to `filePath`.
- Renamed `loadDataA` to `loadDataActivity`.
- Removed `loadDataB` because it duplicated the work of `loadDataA`.
- Renamed `b` to `activityData`.
- Renamed `one` to `newActivity`.

### Tasks Module
- Updated `tasks.controller.js` to use the shared validator in `utils/taskValidator.js`.
- Updated `createTask` and `updateTask` to use the shared task validation functions.
- Used validated data when creating and updating tasks.
- Prevented updates to unsupported fields by validating the update payload before merging it with the existing task.

### Reports Module
- Added the Reports route, controller, and service.
- Registered the Reports route in `app.js`.
- Added an endpoint that returns the total number of tasks, task counts by status, and the total number of activities.

---

## Bugs

### Task summary cannot distinguish in-progress tasks

- **What is wrong:** In `reports.service.js`, tasks with `completed === false` are counted as `todo`, while `in-progress` is always set to `0`.
- **Why it matters:** The report cannot distinguish between tasks that have not started and tasks that are in progress.
- **How to improve it:** Use an explicit status field if the task data supports it. If the data only contains a `completed` boolean, document this limitation.

---

## Performance

No confirmed performance problems were identified in the reviewed changes.

The Reports service reads the task and activity files concurrently using `Promise.all`. Task operations read and rewrite the JSON file, which is acceptable for a small project but may become slower as the data grows.

---

## Maintainability

No confirmed maintainability problems were identified in the reviewed changes.

The task validation rules are shared through `taskValidator.js`, and the Reports route, controller, and service are separated into different files.

---

## Security

No confirmed security problems were identified in the current `tasks.service.js` code.

The update operation validates the incoming fields before merging them with the existing task. The validator allows only supported fields, such as `title` and `completed`, preventing clients from updating fields such as `id` and `createdAt` through this operation.

---

## Code Quality

No confirmed additional code quality problems were identified in the reviewed changes.

The task service uses validated data when creating and updating tasks, and it creates a new object when updating an existing task instead of modifying the original request payload.
