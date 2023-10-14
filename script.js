class Activity {
    constructor(name, date, caloriesBurned) {
        this.name = name;
        this.date = date;
        this.caloriesBurned = caloriesBurned;
    }
}

class Running extends Activity {
    constructor(name, date, caloriesBurned, distance, speed) {
        super(name, date, caloriesBurned);
        this.distance = distance;
        this.speed = speed;
    }
}

class GymExercise extends Activity {
    constructor(name, date, caloriesBurned, weight, repetitions) {
        super(name, date, caloriesBurned);
        this.weight = weight;
        this.repetitions = repetitions;
    }
}

class Food {
    constructor(name, calories, protein, fat, carbs) {
        this.name = name;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
    }
}

class Diary {
    constructor() {
        this.activities = [];
        this.foods = [];
    }

    addActivity(activity) {
        this.activities.push(activity);
    }

    addFood(food) {
        this.foods.push(food);
    }

    totalCaloriesBurned() {
        return this.activities.reduce((total, activity) => total + activity.caloriesBurned, 0);
    }

    totalCaloriesConsumed() {
        return this.foods.reduce((total, food) => total + food.calories, 0);
    }

    netCalories() {
        return this.totalCaloriesConsumed() - this.totalCaloriesBurned();
    }
}

let diary = new Diary();
diary.addActivity(new Running("Morning run", new Date(), 300, 5, 10));
diary.addFood(new Food("Chicken breast", 200, 30, 5, 0));

console.log(`Total calories burned: ${diary.totalCaloriesBurned()}`);
console.log(`Total calories consumed: ${diary.totalCaloriesConsumed()}`);
console.log(`Net calories: ${diary.netCalories()}`);