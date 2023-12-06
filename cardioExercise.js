const { GymExercise } = require('./GymExercises.js');

  class CardioExercise extends GymExercise {
    constructor(name, date, duration, caloriesPerHour, intensity) {
        super(name, date, duration, caloriesPerHour, 0, 0);
        this.intensity = intensity;
    }

    calculateCaloriesBurned() {
        // Override the calories calculation for cardio exercises based on intensity
        return this.duration * this.caloriesPerHour * this.intensity;
    }

    getSummary() {
        return `${super.getSummary()}, with intensity ${this.intensity}.`;
    }
}

module.exports = { CardioExercise };