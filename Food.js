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
module.exports = { Food };