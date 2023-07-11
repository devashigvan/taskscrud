const TaskModel = require("../models/TaskModel");

//--- Get All Tasks ---//
module.exports.getTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.send(tasks);
};

//--- Save New Task ---//
module.exports.saveTask = async (req, res) => {
  const { task } = req.body;

  TaskModel.create({ task })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({ error: err, message: "Something went wrong!" });
    });
};

//--- Update Task By Id ---//
module.exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => {
      res.status(200).send("Updated Successfully");
    })
    .catch((err) => {
      res.status(404).send({ error: err, message: "Something went wrong!" });
    });
};

//--- Delete Task By Id ---//
module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => res.status(200).send("Deleted Successfully"))
    .catch((err) => {
      res.status(404).send({ error: err, message: "Something went wrong!" });
    });
};
