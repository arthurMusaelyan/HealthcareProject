export default class Activity {
    constructor(name, date, duration, caloriesPerHour, description = "", category = "") {
        this.name = name;
        this.date = date;
        this.duration = duration;
        this.caloriesPerHour = caloriesPerHour;
        this.description = description;
        this.category = category;
    }

    calculateCaloriesBurned() {
        return this.duration * this.caloriesPerHour;
    }

    getSummary() {
        return `${this.name}: ${this.calculateCaloriesBurned()} calories burned`;
    }
}


