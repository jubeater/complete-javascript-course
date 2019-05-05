import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import List from './models/List.js';
import Likes from './models/Likes.js';
import {elements, renderLoader, clearLoader} from './views/base.js';
import * as searchView from './views/searchView.js';
import * as recipeView from './views/recipeView.js';
import * as listView from './views/listView.js';
import * as likesView from './views/likesView.js';

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
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if (state.search)  searchView.highlightSelected(id);
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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)    
            );
        } catch(error) {
            console.log('error processing recipe!');
            console.log(error);
        }

    }
};


const controlList = () => {
    //create a new list if there is none yet
    if (!state.list) state.list = new List();
    //add each ingredient  to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
        
    });
}


const controlLike = () => {
   if (!state.likes) state.likes = new Likes();
   const currentID = state.recipe.id;
   //user is not yet like the recipe
   if (!state.likes.isLiked(currentID)) {
        //add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img);
        //toggle like button
        likesView.toggleLikeBtn(true);
        //add like to ui like
        likesView.renderLike(newLike);
        //console.log(state.likes);
    //user has liked cur recipe
   } else {
        //remove like from the state
        state.likes.deleteLike(currentID);
        //toggle the button
        likesView.toggleLikeBtn(false);
        //remove like from ui list
        likesView.deleteLike(currentID);
        //console.log(state.likes);
   }

   likesView.toggleLikeMenu(state.likes.getNumLikes());
};

window.addEventListener('load', () => {
    state.likes = new Likes();
    //restore likes
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes())

    state.likes.Likes.forEach(like => likesView.renderLike(like));
});



//handle delete nad update list item events
elements.shopping.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //handle delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);
        //delete from view
        listView.deleteItem(id);
        //hanedle count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = e.target.value;
        state.list.updateCount(id, val);
    }
});

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));


//handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();    
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //Like troller
        controlLike();
    }

});
