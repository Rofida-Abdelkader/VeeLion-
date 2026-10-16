import type { Task } from "@/types/api";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
};

export function TaskItem({ task, busy, onToggle }: TaskItemProps) {
  const statusLabel = busy ? "In Progress" : task.completed ? "Completed" : "Pending";
  const statusClass = busy
    ? "status-in-progress"
    : task.completed
      ? "status-completed"
      : "status-pending";

  return (
    <li className="card task-item">
      <div className="task-item__heading">
        <p className="task-item__title">{task.title}</p>
        <span className={`badge ${statusClass}`}>{statusLabel}</span>
      </div>

      <small className="task-item__updated">
        Updated: {new Date(task.updatedAt).toLocaleString()}
      </small>

      <div className="task-item__actions">
        <button
          type="button"
          className="button"
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        >
          {busy ? "Saving..." : task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>
      </div>
    </li>
  );
}
