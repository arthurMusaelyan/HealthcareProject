class Activity {
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

class StrengthTraining extends GymExercise {
    constructor(name, date, duration, caloriesPerHour, weight, repetitions, muscleGroup) {
        super(name, date, duration, caloriesPerHour, weight, repetitions);
        this.muscleGroup = muscleGroup;
    }

    getSummary() {
        return `${super.getSummary()}, targeting ${this.muscleGroup} muscles.`;
    }
}

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
        console.log(`Logged activity: ${activity.getSummary()}`);
    }

    addFood(food) {
        this.foods.push(food);
        console.log(`Logged food: ${food.getNutritionalInfo()}`);
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
}

class HealthApp {
    constructor() {
        this.diary = new Diary();
    }

    logActivity(name, date, duration, caloriesPerHour, type, distance, weight, repetitions, muscleGroup, intensity) {
        let activity;

        if (type === "running") {
            activity = new Running(name, date, duration, caloriesPerHour, distance);
        } else if (type === "strength") {
            activity = new StrengthTraining(name, date, duration, caloriesPerHour, weight, repetitions, muscleGroup);
        } else if (type === "cardio") {
            activity = new CardioExercise(name, date, duration, caloriesPerHour, intensity);
        }

        this.diary.addActivity(activity);
    }

    logFood(name, date, calories, protein, fat, carbs) {
        const food = new Food(name, date, calories, protein, fat, carbs);
        this.diary.addFood(food);
    }

    showStatistics() {
        console.log(`Total calories burned: ${this.diary.totalCaloriesBurned()}`);
        console.log(`Total calories consumed: ${this.diary.totalCaloriesConsumed()}`);
        console.log(`Net calories: ${this.diary.netCalories()}`);
        console.log(`Bonus points: ${this.diary.bonusPoints}`);
        console.log(`Activities by max achievements: ${this.diary.getActivitiesByMaxAchievements().map(activity => activity.name)}`);
        console.log(`Average activity score: ${this.diary.getAverageActivityScore()}`);
        console.log(`Daily results: ${this.diary.getDailyResults(new Date())}`);
        console.log(`Foods by date: ${this.diary.getFoodsByDate(new Date()).map(food => food.name).join(', ')}`);
        console.log(`Foods by calories: ${this.diary.getFoodsByCalories().map(food => food.name).join(', ')}`);
        console.log(`Average food score: ${this.diary.getAverageFoodScore()}`);
        console.log(`Daily food results: ${this.diary.getDailyFoodResults(new Date())}`);
    }

    clearDayHistory(date) {
        this.diary.clearDayHistory(date);
    }
}

// Приклад використання нового функціоналу
let healthApp = new HealthApp();

// Додаємо активності та їжу
healthApp.logActivity("Morning run", new Date(), 1, 600, "running", 5, 0, 0, "", 0);
healthApp.logFood("Chicken breast", new Date(), 200, 30, 5, 0);

// Додаємо додаткові активності
let strengthExercise = new StrengthTraining("Bench Press", new Date(), 1, 300, 80, 10, "Chest");
let cardioExercise = new CardioExercise("Running on Treadmill", new Date(), 0.5, 600, 1.5);

healthApp.logActivity(strengthExercise.name, strengthExercise.date, strengthExercise.duration, strengthExercise.caloriesPerHour, "strength", 0, strengthExercise.weight, strengthExercise.repetitions, strengthExercise.muscleGroup, 0);
healthApp.logActivity(cardioExercise.name, cardioExercise.date, cardioExercise.duration, cardioExercise.caloriesPerHour, "cardio", 0, 0, 0, "", cardioExercise.intensity);

// Виводимо статистику
healthApp.showStatistics();
