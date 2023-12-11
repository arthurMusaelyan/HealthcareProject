// activityFactory.js
const { Running } = require('./running.js');
const { StrengthTraining } = require('./strengthTraining.js');
const { CardioExercise } = require('./cardioExercise.js');

class ActivityFactory {
    createActivity(type, name, date, duration, caloriesPerHour, options) {
        if (type === "running") {
            return new Running(name, date, duration, caloriesPerHour, options.distance);
        } else if (type === "strength") {
            return new StrengthTraining(name, date, duration, caloriesPerHour, options.weight, options.repetitions, options.muscleGroup);
        } else if (type === "cardio") {
            return new CardioExercise(name, date, duration, caloriesPerHour, options.intensity);
        }
    }
}

module.exports = { ActivityFactory };
