function TaskItem({
  title,
  project,
  status,
  onDelete,
  onToggle,
}) {
  const statusStyles = {
    "In Progress": "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-blue-100 text-blue-700",
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h4 className="font-semibold text-gray-900">
          {title}
        </h4>

        <p className="mt-1 text-sm text-gray-500">
          {project}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            statusStyles[status]
          }`}
        >
          {status}
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem