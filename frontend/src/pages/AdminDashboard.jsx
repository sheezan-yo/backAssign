/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/admin/users");
      setUsers(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/admin/all");
      setTasks(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/admin/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    }
  };

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold"> Admin Dashboard </h1>
            <p className="text-slate-400"> Welcome, {user?.name} </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400 text-sm"> Total Users </h3>
            <p className="text-4xl font-bold mt-2"> {users.length} </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400 text-sm"> Total Tasks </h3>
            <p className="text-4xl font-bold mt-2"> {tasks.length} </p>
          </div>
        </div>
        {/* Users */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6"> Users </h2>
          <div className="space-y-3">
            {users.length === 0 ? (
              <p className="text-slate-400"> No users found </p>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div>
                    <h3 className="font-semibold"> {user.name} </h3>
                    <p className="text-slate-400 text-sm">{user.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs w-fit ${user.role === "admin" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}
                  >
                    {user.role}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Tasks */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6"> All Tasks </h2>
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-slate-400"> No tasks found </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-slate-800 rounded-xl p-4"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-slate-400 mt-1">{task.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${task.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                        >
                          {task.status}
                        </span>
                        {task.createdBy && (
                          <span className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300">
                            {task.createdBy.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-4 py-2 h-fit rounded-xl bg-red-600 hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
