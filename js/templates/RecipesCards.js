class RecipesCards{
    constructor(recipes) {
        this._recipe = recipes;
    }

    createRecipeCard() {
        const $createArticleCard = document.createElement('article');
        $createArticleCard.className = 'bground-grey-light'
        const createImgArticle = document.createElement('div');
        createImgArticle.className = 'article-vide bground-grey-medium';

        const containerTitleTimes = document.createElement('div');
        containerTitleTimes.className = 'container-title-times';
        const createArticleTitle = document.createElement('h2');
        createArticleTitle.innerHTML = this._recipe.name;

        const containerTimes = document.createElement('div');
        containerTimes.className = 'container-times';

        const createTimesIcon = document.createElement('span');
        createTimesIcon.className = 'times-icons';

        const createTimes = document.createElement('span');
        createTimes.innerHTML = `${this._recipe.time} min`;
        createTimes.className = 'times';

        const containerInfo = document.createElement('div');
        containerInfo.className = 'container-info';

        const containerIngredient = document.createElement('ul');
        containerIngredient.className = 'container-ingredients';

        this._recipe._ingredients.forEach( ingredients => {
            const ingredientsList = ingredients
            const ingredientUnit = ingredientsList['unit']
            const ingredientQuantity = ingredientsList['quantity']
            const ingredientIngredient = ingredientsList['ingredient']

            let list = document.createElement('li');
            list.className = 'list-recipe'
            // Si dans la liste d'ingrédient, il n'y a pas de quantité ni de mesure d'unité
            if(!ingredientUnit && !ingredientQuantity){
                list.innerHTML = `<strong>${ingredientIngredient}</strong>`
            }
            // Sinon Si dans la liste d'ingredient, il n'y a pas de mesure d'unité et il y a une quantité disponible
            else if(!ingredientUnit && ingredientQuantity){
                list.innerHTML = `<strong>${ingredientIngredient}</strong> ${ingredientQuantity}`
            }
            else{
                list.innerHTML = `<strong>${ingredientIngredient}</strong> ${ingredientQuantity} ${ingredientUnit}`
            }
            containerIngredient.appendChild(list)
        })

        const elementText = document.createElement('p')
        elementText.innerHTML = this._recipe.description
        elementText.className = "recipe-description"

        containerTimes.appendChild(createTimesIcon);
        containerTimes.appendChild(createTimes);
        containerTitleTimes.appendChild(createArticleTitle);
        containerTitleTimes.appendChild(containerTimes);
        containerInfo.appendChild(containerIngredient)
        containerInfo.appendChild(elementText)
        $createArticleCard.appendChild(createImgArticle);
        $createArticleCard.appendChild(containerTitleTimes);
        $createArticleCard.appendChild(containerInfo);

        return $createArticleCard
    }
}