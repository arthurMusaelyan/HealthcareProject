// strengthTraining.js
const { GymExercise } = require('./GymExercises.js');
class StrengthTraining extends GymExercise {
    constructor(name, date, duration, caloriesPerHour, weight, repetitions, muscleGroup) {
        super(name, date, duration, caloriesPerHour, weight, repetitions);
        this.muscleGroup = muscleGroup;
    }

    getSummary() {
        return `${super.getSummary()}, targeting ${this.muscleGroup} muscles.`;
    }
}

module.exports = { StrengthTraining };
