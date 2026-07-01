/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLogoutOpen, setisLogoutOpen] = useState(false);
  const [isEditOpen, setisEditOpen] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  const [edit, setEdit] = useState({
    _id: "",
    title: "",
    edscription: "",
    status: "pending",
  });

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", formData);

      setFormData({
        title: "",
        description: "",
        status: "pending",
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      toast.success("Task deleted");
      setisDeleteOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "Something went wrong",
      );
      console.error(error);
    }
  };

  const updateTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        ...task,
        title: edit.title,
        description: edit.description,
        status: edit.status,
      });

      toast.success("Task updated");
      setisEditOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "Something went wrong",
      );
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold"> Task Dashboard </h1>
            <p className="text-slate-400 text-sm">Welcome, {user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            {user?.role === "admin" && (
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition">
                <Link to="/admin">Admin</Link>
              </button>
            )}
            <button
              onClick={() => setisLogoutOpen(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Create Task */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5"> Create Task </h2>
            <form onSubmit={createTask} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Task title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
              />
              <textarea
                name="description"
                placeholder="Task description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
              >
                <option value="pending"> Pending </option>
                <option value="completed"> Completed </option>
              </select>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>
        {/* Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6"> My Tasks </h2>
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <p className="text-slate-400"> No tasks found. </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className="border border-slate-800 rounded-xl p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <p className="text-slate-400 mt-1">
                          {task.description}
                        </p>
                        <span
                          className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${task.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setEdit({
                              _id: task._id,
                              title: task.title,
                              description: task.description,
                              status: task.status,
                            });
                            setisEditOpen(true);
                          }}
                          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setisDeleteOpen(true);
                          }}
                          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {isEditOpen && (
              <div
                onClick={() => setisEditOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl"
                >
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Edit Task
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">
                        Title
                      </label>

                      <input
                        type="text"
                        name="title"
                        value={edit.title}
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-300 mb-2">
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={edit.description}
                        onChange={handleEditChange}
                        rows="4"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-300 mb-2">
                        Status
                      </label>

                      <select
                        name="status"
                        value={edit.status}
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      >
                        <option value="pending">Pending</option>

                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setisEditOpen(false)}
                      className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => updateTask(selectedTask)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      Update Task
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isDeleteOpen && (
              <div
                onClick={() => setisDeleteOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl"
                >
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Delete Task
                  </h2>

                  <p className="text-slate-400 mb-6">
                    Are you sure you want to delete this task?
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setisDeleteOpen(false)}
                      className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => deleteTask(selectedTask._id)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLogoutOpen && (
        <div
          onClick={() => setisLogoutOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl"
          >
            <h2 className="text-xl font-semibold text-white mb-2">Logout</h2>

            <p className="text-slate-400 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setisLogoutOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
              >
                Cancel
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
