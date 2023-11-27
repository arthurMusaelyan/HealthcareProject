// strengthTraining.js
import GymExercise from './GymExercises';

export default class StrengthTraining extends GymExercise {
    constructor(name, date, duration, caloriesPerHour, weight, repetitions, muscleGroup) {
        super(name, date, duration, caloriesPerHour, weight, repetitions);
        this.muscleGroup = muscleGroup;
    }

    getSummary() {
        return `${super.getSummary()}, targeting ${this.muscleGroup} muscles.`;
    }
}
