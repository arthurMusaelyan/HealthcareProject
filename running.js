const { Activity } = require('./Activity.js');

 class Running extends Activity {
    constructor(name, date, duration, caloriesPerHour, distance) {
        super(name, date, duration, caloriesPerHour, "Running activity", "Cardio");
        this.distance = distance;
    }

    calculatePace() {
        return this.duration / this.distance;
    }

    getSummary() {
        return `${super.getSummary()}, ${this.distance}km ran in ${this.duration} hours at a pace of ${this.calculatePace()} hours/km.`;
    }
}
module.exports = { Running };