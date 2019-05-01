import Search from './models/Search.js';
import {elements, renderLoader, clearLoader} from './views/base.js';
import * as searchView from './views/searchView.js';
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

    }

};

elements.searchForm.addEventListener('submit', e => {
   e.preventDefault(); 
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});
