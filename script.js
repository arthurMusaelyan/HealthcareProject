class Activity {
    constructor(name, date, duration, caloriesPerHour) {
        this.name = name;
        this.date = date;
        this.duration = duration;
        this.caloriesPerHour = caloriesPerHour;
    }

    calculateCaloriesBurned() {
        return this.duration * this.caloriesPerHour;
    }
}

class Running extends Activity {
    constructor(name, date, duration, caloriesPerHour, distance) {
        super(name, date, duration, caloriesPerHour);
        this.distance = distance;
    }

    calculatePace() {
        return this.duration / this.distance;
    }

    getExerciseSummary() {
        return `${this.name}: ${this.distance}km ran in ${this.duration} hours at a pace of ${this.calculatePace()} hours/km, burning ${this.calculateCaloriesBurned()} calories.`;
    }
}

class GymExercise {
    constructor(name, date, duration, caloriesPerHour, weight, repetitions) {
        this.name = name;
        this.date = date;
        this.duration = duration;
        this.caloriesPerHour = caloriesPerHour;
        this.weight = weight;
        this.repetitions = repetitions;
    }

    calculateTotalWeightLifted() {
        return this.weight * this.repetitions;
    }

    getExerciseSummary() {
        return `${this.name}: ${this.repetitions} repetitions of ${this.weight}kg, lifting a total of ${this.calculateTotalWeightLifted()}kg and burning ${this.calculateCaloriesBurned()} calories.`;
    }

    calculateCaloriesBurned() {
        return this.duration * this.caloriesPerHour;
    }
}

class StrengthTraining extends GymExercise {
    constructor(name, date, duration, caloriesPerHour, weight, repetitions, muscleGroup) {
        super(name, date, duration, caloriesPerHour, weight, repetitions);
        this.muscleGroup = muscleGroup;
    }

    getExerciseSummary() {
        return `${this.name}: ${this.repetitions} repetitions of ${this.weight}kg targeting ${this.muscleGroup} muscles, lifting a total of ${this.calculateTotalWeightLifted()}kg and burning ${this.calculateCaloriesBurned()} calories.`;
    }
}

class CardioExercise extends GymExercise {
    constructor(name, date, duration, caloriesPerHour, intensity) {
        super(name, date, duration, caloriesPerHour);
        this.intensity = intensity;
    }

    calculateCaloriesBurned() {
        // Override the calories calculation for cardio exercises based on intensity
        return this.duration * this.caloriesPerHour * this.intensity;
    }
}
class Food {
    constructor(name, date, calories, protein, fat, carbs) {
        this.name = name;
        this.date = date;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
    }

    calculateMacronutrientPercentage() {
        return {
            protein: (this.protein * 4) / this.calories,
            fat: (this.fat * 9) / this.calories,
            carbs: (this.carbs * 4) / this.calories
        };
    }

    getNutritionalInfo() {
        return `${this.name}: ${this.calories} calories, ${this.protein}g protein, ${this.fat}g fat, ${this.carbs}g carbs.`;
    }
}

class Diary {
    constructor() {
        this.activities = [];
        this.foods = [];
        this.bonusPoints = 0;
    }

    addActivity(activity) {
        this.activities.push(activity);
        this.bonusPoints += activity.calculateCaloriesBurned() / 100;
    }

    addFood(food) {
        this.foods.push(food);
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
        return this.activities.filter(activity => activity.date === date);
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
}

let diary = new Diary();
let strengthExercise = new StrengthTraining("Bench Press", new Date(), 1, 300, 80, 10, "Chest");
let cardioExercise = new CardioExercise("Running on Treadmill", new Date(), 0.5, 600, 1.5);

diary.addActivity(new Running("Morning run", new Date(), 1, 600, 5, 10));
diary.addFood(new Food("Chicken breast", new Date(), 200, 30, 5, 0));

console.log(`Total calories burned: ${diary.totalCaloriesBurned()}`);
console.log(`Total calories consumed: ${diary.totalCaloriesConsumed()}`);
console.log(`Net calories: ${diary.netCalories()}`);
console.log(`Bonus points: ${diary.bonusPoints}`);
console.log(`Activities by max achievements: ${diary.getActivitiesByMaxAchievements().map(activity => activity.name)}`);
console.log(`Average activity score: ${diary.getAverageActivityScore()}`);
console.log(`Daily results: ${diary.getDailyResults(new Date())}`);
console.log(diary.activities[0].getExerciseSummary());
console.log(diary.foods[0].getNutritionalInfo());
console.log(strengthExercise.getExerciseSummary());
console.log(cardioExercise.getExerciseSummary());
