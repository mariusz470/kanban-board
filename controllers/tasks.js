const Task = require("../models/Task");

// @desc Get all tasks
// @route GET /api/v1/tasks
// access Public
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Add task
// @route POST /api/v1/tasks
// access Public
exports.addTask = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const task = await Task.create(req.body);

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc  Delete task
// @route GET /api/v1/tasks/:id
// access Public
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "No task found",
      });
    }

    await task.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc  Edit task
// @route PUT /api/v1/tasks/:id
// access Public
exports.editTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        icon: req.body.icon,
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "No task found",
      });
    }
    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
