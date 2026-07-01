const express = require("express");
const auth = require("../middlewares/authMiddleware");
const { getTasks, getTaskById, createTask, updateTask, deleteTask, getAllTasks, deleteAnyTask } = require("../controllers/taskController");
const authorize = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validate");
const { taskSchema } = require("../src/validations/taskValidation");
const router = express.Router();

router.post("/", auth, validate(taskSchema), createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth, getTasks);

/**
 * @swagger
 * /tasks/admin/all:
 *   get:
 *     summary: Get all tasks (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tasks retrieved successfully
 *       403:
 *         description: Admin access required
 */
router.get("/admin/all", auth, authorize("admin"), getAllTasks);

router.delete("/admin/:id", auth, authorize("admin"), deleteAnyTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
router.get("/:id", auth, getTaskById);

router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;