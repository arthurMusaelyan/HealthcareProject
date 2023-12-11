const { Activity, Food } = require('./Activity.js');
const { Subject } = require('./subject.js');


class Diary extends Subject {
    constructor() {
        super();
        this.activities = [];
        this.foods = [];
        this.bonusPoints = 0;
    }

    addActivity(activity) {
        this.activities.push(activity);
        this.bonusPoints += activity.calculateCaloriesBurned() / 100;
        console.log(`Logged activity: ${activity.getSummary()}`);
        this.notifyObservers(activity);
    }

    addFood(food) {
        this.foods.push(food);
        console.log(`Logged food: ${food.getNutritionalInfo()}`);
        this.notifyObservers(food);
    }

    totalCaloriesBurned() {
        return this.activities.reduce((total, activity) => total + activity.calculateCaloriesBurned(), 0);
    }

    totalCaloriesConsumed() {
        return this.foods.reduce((total, food) => total + food.calories, 0);
    }

    netCalories() {
        return this.totalCaloriesConsumed() - this.totalCaloriesBurned();
    }

    getActivitiesByDate(date) {
        return this.activities.filter(activity => activity.date.toDateString() === date.toDateString());
    }

    getActivitiesByMaxAchievements() {
        return this.activities.sort((a, b) => b.calculateCaloriesBurned() - a.calculateCaloriesBurned());
    }

    getAverageActivityScore() {
        return this.activities.reduce((total, activity) => total + activity.calculateCaloriesBurned(), 0) / this.activities.length;
    }

    getDailyResults(date) {
        const activities = this.getActivitiesByDate(date);
        return activities.reduce((total, activity) => total + activity.calculateCaloriesBurned(), 0);
    }

    getFoodsByDate(date) {
        return this.foods.filter(food => food.date.toDateString() === date.toDateString());
    }

    getFoodsByCalories() {
        return this.foods.sort((a, b) => b.calories - a.calories);
    }

    getAverageFoodScore() {
        return this.foods.reduce((total, food) => total + food.calories, 0) / this.foods.length;
    }

    getDailyFoodResults(date) {
        const foods = this.getFoodsByDate(date);
        return foods.reduce((total, food) => total + food.calories, 0);
    }

    clearDayHistory(date) {
        this.activities = this.activities.filter(activity => activity.date.toDateString() !== date.toDateString());
        this.foods = this.foods.filter(food => food.date.toDateString() !== date.toDateString());
        console.log(`Cleared history for ${date.toDateString()}`);
    }
}

module.exports = { Diary };
