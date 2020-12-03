const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  totalDuration: {
    type: Number,
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter a exercise type",
      },
      name: {
        type: String,
        trim: true,
        required: "Enter a exercise name",
      },
      duration: {
        type: Number,
        required: "Enter a duration",
      },
      distance: {
        type: Number,
        required: "Enter a distance",
      },
      weight: {
        type: Number,
        required: "Enter a weight",
      },
      reps: {
        type: Number,
        required: "Enter the number of reps",
      },
      sets: {
        type: Number,
        required: "Enter the number of sets",
      },
    },
  ],
});

workoutSchema.methods.getTotalDuration = function () {
  this.totalDuration = this.exercises.reduce((acc, curr) => {
    acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
    return acc;
  }, {}).totalDuration;
  return this.totalDuration;
};

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
