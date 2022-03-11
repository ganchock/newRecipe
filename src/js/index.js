require("@babel/polyfill");
import Search from "./model/Search";

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
    const query = "pizza";
    if (query) {
        // 2) Шинээр хайлтын обьектийг үүсгэж өгнө
        state.search = new Search(query);
        // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
        // 4) Хайлтыг гүйцэтгэнэ
        await state.search.doSearch();
        // 5) Хайлтын үр дүнг үзүүлнэ.
        console.log(state.search.result);
    }
};
document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});