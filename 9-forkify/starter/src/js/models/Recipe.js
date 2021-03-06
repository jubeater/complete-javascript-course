import axios from 'axios';
import {key, proxy } from './../config.js';
export default class Recipe{
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
        const unitsShort = ['tbsp','tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        const newIngredients = this.ingredients.map(el => {
            //uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            //remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            //parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                //have unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-','+'));
                } else {
                    //err happen when the single ingredent is like '1 stick 2 tps butter'
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' '),
                }
            } else if (parseInt(arrIng[0], 10)) {
                //no unit but have number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' '),
                }
            } else {
                //no unit and number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient,
                }
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        //update servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        
        //update ingredients
        this.ingredients.forEach(el => {
            el.count *= (newServings/this.servings);
        });

        this.servings = newServings;
    }

}