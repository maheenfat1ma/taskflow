import { useEffect, useState } from "react"
import TaskItem from "./components/TaskItem"

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("taskflow-tasks")

  return savedTasks
    ? JSON.parse(savedTasks)
    : [
        {
          id: 1,
          title: "Build landing page",
          project: "Website Project",
          status: "In Progress",
        },
        {
          id: 2,
          title: "Create navigation menu",
          project: "Dashboard Project",
          status: "Completed",
        },
        {
          id: 3,
          title: "Fix mobile layout",
          project: "Responsive Website",
          status: "Pending",
        },
      ]
})
    useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
  }, [tasks])

  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const [newTask, setNewTask] = useState({
    title: "",
    project: "",
    status: "Pending",
  })

  const addTask = () => {
    if (!newTask.title || !newTask.project) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.title,
        project: newTask.project,
        status: newTask.status,
      },
    ])

    setNewTask({
      title: "",
      project: "",
      status: "Pending",
    })

    setShowForm(false)
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Completed"
                  ? "Pending"
                  : "Completed",
            }
          : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === "All" || task.status === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white p-6 md:block">
        <h1 className="text-2xl font-bold text-gray-900">
          TaskFlow
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Project Management
        </p>

        <nav className="mt-10 space-y-2">
          <button className="w-full rounded-lg bg-gray-900 px-4 py-3 text-left text-white">
            📊 Dashboard
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left text-gray-600 hover:bg-gray-100">
            📁 Projects
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left text-gray-600 hover:bg-gray-100">
            ✅ Tasks
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-4 md:ml-64 md:p-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h2>

            <p className="mt-2 text-gray-500">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white shadow-sm hover:bg-gray-800"
          >
            + Add Task
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Projects
            </p>
            <h3 className="mt-2 text-3xl font-bold text-gray-900">
              {new Set(tasks.map((task) => task.project)).size}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Active Tasks
            </p>

            <h3 className="mt-2 text-3xl font-bold text-gray-900">
              {tasks.filter((task) => task.status !== "Completed").length}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <h3 className="mt-2 text-3xl font-bold text-gray-900">
              {tasks.filter((task) => task.status === "Completed").length}
            </h3>
          </div>

        </div>
        {/* Project Progress */}
<div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-bold text-gray-900">
        Project Progress
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Overall task completion
      </p>
    </div>

    <span className="font-semibold text-gray-900">
      {tasks.length
        ? Math.round(
            (tasks.filter((task) => task.status === "Completed").length /
              tasks.length) *
              100
          )
        : 0}%
    </span>
  </div>

  <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200">
    <div
      className="h-full rounded-full bg-gray-900 transition-all"
      style={{
        width: `${
          tasks.length
            ? Math.round(
                (tasks.filter(
                  (task) => task.status === "Completed"
                ).length /
                  tasks.length) *
                  100
              )
            : 0
        }%`,
      }}
    />
  </div>
</div>
        {/* Add Task Form */}
        {showForm && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">
              Add New Task
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              <input
                type="text"
                placeholder="Task name"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

              <input
                type="text"
                placeholder="Project name"
                value={newTask.project}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    project: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

              <select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    status: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

            </div>

            <div className="mt-4 flex gap-3">

              <button
                onClick={addTask}
                className="rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white"
              >
                Add Task
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700"
              >
                Cancel
              </button>

            </div>
          </div>
        )}

        {/* Recent Tasks */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Recent Tasks
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Keep track of your latest tasks.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {filteredTasks.length} tasks
            </span>
          </div>

          {/* Search & Filter */}
          <div className="mt-6 flex flex-col gap-3 md:flex-row">

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            >
              <option value="All">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

          </div>

          {/* Task List */}
          <div className="mt-4 space-y-4">

            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  title={task.title}
                  project={task.project}
                  status={task.status}
                  onDelete={() => deleteTask(task.id)}
                  onToggle={() => toggleComplete(task.id)}
                />
              ))
            ) : (
              <p className="py-8 text-center text-gray-500">
                No tasks found.
              </p>
            )}

          </div>

        </div>

      </main>
    </div>
  )
}

export default App