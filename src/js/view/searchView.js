import { elements } from "./base";

// Private function
const renderRecipe = (recipe) => {
    const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test" />
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searcResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearchQeury = () => {
    elements.searchInput.value = " ";
};
export const clearSearchResult = () => {
    elements.searcResultList.innerHTML = "";
    elements.pageButtons.innerHTML = "";
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
    // Хайлтын үр дүнг хуудаслаж үзүүлэх
    // page = 2, start = 10, end = 20
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // Хуудаслалтын товчуудыг гаргаж ирэх
    const totalPage = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPage);
};
// type ===> "prev", "next"
const createButton = (page, type, direction) => `
    <button class="btn-inline results__btn--${type}" data-goto=${page}>
            <span>Хуудас ${page}</span>
            <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${direction}"></use>
            </svg>
          </button>      
`;
const renderButtons = (currentPage, totalPage) => {
    let buttonHtml;

    if (currentPage === 1 && totalPage > 1) {
        // 1-р хуудсан дээр байна, 2-р хуудас гэдэг товчийг гарга
        buttonHtml = createButton(2, "next", "right");
    } else if (currentPage < totalPage) {
        // Өмнөх болон дараачийн хуудас руу шилжих товчуудыг үзүүл
        buttonHtml = createButton(currentPage - 1, "prev", "left");
        buttonHtml += createButton(currentPage + 1, "next", "right");
    } else if (currentPage === totalPage) {
        // Хамгийн сүүлийн хуудас дээр байна. Өмнөх хуудас руу шилжүүлэх товчийг л үзүүлнэ.
        buttonHtml = createButton(currentPage - 1, "prev", "left");
    }
    elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};