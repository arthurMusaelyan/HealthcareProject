// gymExercise.js
const { Activity } = require('./Activity.js');


  class GymExercise extends Activity {
    constructor(name, date, duration, caloriesPerHour, weight, repetitions) {
        super(name, date, duration, caloriesPerHour, "Gym workout", "Strength Training");
        this.weight = weight;
        this.repetitions = repetitions;
    }

    calculateTotalWeightLifted() {
        return this.weight * this.repetitions;
    }

    getSummary() {
        return `${super.getSummary()}, ${this.repetitions} repetitions of ${this.weight}kg, lifting a total of ${this.calculateTotalWeightLifted()}kg.`;
    }
}
module.exports = { GymExercise };

