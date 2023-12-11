const { Diary } = require('./diary.js');
const { Running } = require('./running.js');
const { StrengthTraining } = require('./strengthTraining.js');
const { Food } = require('./Food.js');
const { CardioExercise } = require('./cardioExercise.js');
const { ActivityFactory } = require('./activityFactory.js');
const { HealthAppObserver } = require('./healthAppObserver.js');


  class HealthApp {
    constructor() {
        this.diary = new Diary();
        this.activityFactory = new ActivityFactory();
        this.observer = new HealthAppObserver();
        this.diary.addObserver(this.observer);
    }

      logActivity(name, date, duration, caloriesPerHour, type, distance, weight, repetitions, muscleGroup, intensity) {
          const options = { distance, weight, repetitions, muscleGroup, intensity };
          const activity = this.activityFactory.createActivity(type, name, date, duration, caloriesPerHour, options);
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

healthApp.clearDayHistory(new Date());

module.exports = { HealthApp };