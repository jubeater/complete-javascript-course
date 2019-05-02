import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import {elements, renderLoader, clearLoader} from './views/base.js';
import * as searchView from './views/searchView.js';
import * as recipeView from './views/recipeView.js';
/** Global state of the app
 *  - search object
 *  - cur recipe object
 *  - shopping list object
 *  - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    const query = searchView.getInput(); 
    //console.log(query);

    if (query) {
        state.search = new Search(query);
        try {
            //prepare ui for results
            searchView.clearInput();
            searchView.clearResults();
            //search for recipes
            renderLoader(elements.searchRes);
            await state.search.getResults();
            clearLoader();
            //render results on ui
            console.log(state.search.result);
            searchView.renderResults(state.search.result);
        } catch(error) {
            console.log("sth wrong with the searching...");
            console.log(error);

        }


    }

};

elements.searchForm.addEventListener('submit', e => {
   e.preventDefault(); 
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    //console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    //console.log(id);
    if (id) {
        //ui for changes
        renderLoader(elements.recipe);
        //create recipe object
        state.recipe = new Recipe(id);
        try {
            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(error) {
            console.log('error processing recipe!');
        }

    }
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));