const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.create({
            title, description, status, createdBy: req.user.id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        if (task.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        if (task.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(404).json({
                message: "Access denied",
            });
        }
        Object.assign(task, req.body);
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        if (
            task.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        await task.deleteOne();
        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("createdBy", "name email");

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

const deleteAnyTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask, getAllTasks, deleteAnyTask }