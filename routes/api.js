const router = require("express").Router();
const mongojs = require("mongojs");
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  const { body } = req;
  console.log(body)
  db.Workout.update(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    {
      $push: { exercises: body },
    },
    { new: true }
  )
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/api/workouts/:id", (req, res) => {
  db.Workout.remove({
    _id: mongojs.ObjectID(req.params.id),
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
