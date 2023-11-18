class DiaryFacade {
    constructor() {
        this.diary = new Diary();
    }

    addActivity(activity) {
        this.diary.addActivity(activity);
    }

    addRunningActivity(name, date, duration, caloriesPerHour, distance, speed) {
        const runningActivity = new Running(name, date, duration, caloriesPerHour, distance, speed);
        this.addActivity(runningActivity);
    }

    addGymExercise(name, date, duration, caloriesPerHour, weight, repetitions) {
        const gymExercise = new GymExercise(name, date, duration, caloriesPerHour, weight, repetitions);
        this.addActivity(gymExercise);
    }

    addFood(name, date, calories, protein, fat, carbs) {
        const food = new Food(name, date, calories, protein, fat, carbs);
        this.diary.addFood(food);
    }

    getTotalCaloriesBurned() {
        return this.diary.totalCaloriesBurned();
    }

    getTotalCaloriesConsumed() {
        return this.diary.totalCaloriesConsumed();
    }

    getNetCalories() {
        return this.diary.netCalories();
    }

    getBonusPoints() {
        return this.diary.bonusPoints;
    }

    getActivitiesByMaxAchievements() {
        return this.diary.getActivitiesByMaxAchievements().map(activity => activity.name);
    }

    getAverageActivityScore() {
        return this.diary.getAverageActivityScore();
    }

    getDailyResults(date) {
        return this.diary.getDailyResults(date);
    }

    getExerciseSummary(index) {
        return this.diary.activities[index].getExerciseSummary();
    }

    getNutritionalInfo(index) {
        return this.diary.foods[index].getNutritionalInfo();
    }
}

let diaryFacade = new DiaryFacade(new Diary());
let strengthExercise = new StrengthTraining("Bench Press", new Date(), 1, 300, 80, 10, "Chest");
let cardioExercise = new CardioExercise("Running on Treadmill", new Date(), 0.5, 600, 1.5);

diaryFacade.addRunningActivity("Morning run", new Date(), 1, 600, 5, 10);
diaryFacade.addFood("Chicken breast", new Date(), 200, 30, 5, 0);

