require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";

/**
 * Web app төлөв
 * - Хайлтын query8 oj ;oy
 * - Тухайн үзүүлж байгаа жор
 * - Лайкалсан жорууд
 * - Захиалж байгаа жорын орцууд
 *  */

const state = {};
const controlSearch = async() => {
    // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
    const query = searchView.getInput();
    if (query) {
        // 2) Шинээр хайлтын обьектийг үүсгэж өгнө
        state.search = new Search(query);
        // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
        searchView.clearSearchQeury();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);
        // 4) Хайлтыг гүйцэтгэнэ
        await state.search.doSearch();
        // 5) Хайлтын үр дүнг үзүүлнэ.
        clearLoader();
        if (state.search.result === undefined) alert("Хайлтаар илэрцгүй...");
        else searchView.renderRecipes(state.search.result);
    }
};
elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        const gotoPageNumber = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
});