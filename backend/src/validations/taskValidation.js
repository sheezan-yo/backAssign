const Joi = require("joi");

const taskSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),

    description: Joi.string().required(),

    status: Joi.string().valid("pending", "completed").optional(),
});

module.exports = { taskSchema };