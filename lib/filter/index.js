class Filter {
    /**
     *
     * @param {string} option
     * @param {*} valueOption
     * @param {array} Recipes
     * @returns
     */
    static async filterByOption(option, valueOption,  Recipes) {
        await new Promise(resolve => setTimeout(resolve, 200));

        if(option === 'search-all'){
            let newRecipes = [];
            Recipes.forEach(recipe => {
                // Je recupères l'array des ingredients de la recette
                const ingredientsMatches = recipe._ingredients;
                // Je parcours le tableau d'ingredient
                ingredientsMatches.forEach(ingredient => {
                    // Je récupère seulement le nom des ingredients
                    const ingredientMatches = ingredient['ingredient'];
                    if(ingredientMatches.toLowerCase().includes(valueOption.toLowerCase())){
                        // Si la valeur reçu est inclus dans la liste d'ingredient
                        // J'ajoute la recette dans mon tableau
                        newRecipes.push(recipe);
                    }
                })
                if(recipe._name.toLowerCase().includes(valueOption.toLowerCase())){
                    // Si la valeur reçu est inclus dans le nom de la recette
                    newRecipes.push(recipe);
                }
                if(recipe._descriptions.toLowerCase().includes(valueOption.toLowerCase())){
                    // Si la valeur reçu est inclus dans la description de la recette
                    newRecipes.push(recipe);
                }
            })
            // Je retourne mon nouveau tableau de recettes
            return new Set(newRecipes);
        }
        else if(option === 'list-ingredient'){
            let newList = [];
            // je parcours la list d'ingredients contenu dans Recipes
            Recipes.forEach(listIngredient => {
                if(listIngredient.toLowerCase().includes(valueOption.toLowerCase())){
                    // Si dans la list d'ingrédient la valeur corresond à la valeur de l'option
                    // J'ajoute l'ingredient dans mon array
                    newList.push(listIngredient);
                }
            })
            // Enfin je retourne un nouveau tableau de la liste créer
            return new Set(newList);
        }
        else if(option === 'list-ustensil'){
            let newList = [];
            Recipes.forEach(listUstensil => {
                // Si ustensile existe dans la recette
                if(listUstensil){
                    if(listUstensil.toLowerCase().includes(valueOption.toLowerCase())) {
                        // Si dans la list d'ustensil la valeur corresond à la valeur de l'option
                        newList.push(listUstensil);
                    }
                }
            })
            return new Set(newList)
        }
        else if(option === 'list-appliance'){
            let newList = [];
            Recipes.forEach(listAppliance => {
                if(listAppliance.toLowerCase().includes(valueOption.toLowerCase())){
                    newList.push(listAppliance);
                }
            })
            return new Set(newList);
        }
        else if(option === 'all-filter'){
            // J'initie un tableau vide qui contiendra les recettes triées
            let newRecipes = []
            // Ainsi qu'un tableau vide pour chaque liste de filtre
            let ingredient = [];
            let ustensil = [];
            let appliance = [];
            // Je parcours mon tableau de recette
            Recipes.forEach(recipe => {
                // Je crée mes variables pour chaque type (ingrédients, ustensiles et appareils)
                const getIngredient = recipe._ingredients;
                const getUstensil = recipe._ustensils;
                const getAppliance = recipe._appliances;

                // Je crée une variable pour chaque type qui contiendra le nombre de tag reçu en valeur d'option
                let lengthOptionIngredient = 0;
                let lengthOptionUstensil = 0;
                let lengthOptionAppliance = 0;
                // Variables pour comparer le nombre de fois dont la recette a matché avec une option
                let totalMatchIngredient = 0;
                let totalMatchUstensil = 0;
                let totalMatchAppliance = 0;

                // Je parcours les valeurs reçu en option de filtre
                valueOption.forEach(tag => {
                    // Je récupère le type de liste
                    const tagTypeFilter = tag.typeFilter;
                    // Je switch la valeur récupérer du tag (ingredients, ustensiles où appareils)
                    switch(tagTypeFilter){
                        case 'list-ingredient':
                            // Si valeur = list-ingredient, j'incrémente la longueur option ingredient
                            lengthOptionIngredient += 1;
                            let ingredientMatches;
                            // Je parcours le tableau d'ingredients
                            getIngredient.forEach(ingredient => {
                                // Je récupère uniquement les ingredients
                                ingredientMatches = ingredient['ingredient'];
                                if(ingredientMatches.toLowerCase() === tag.value.toLowerCase()){
                                    // Si l'ingredient = la valeur du tag reçu , j'incrémente le nombre de fois dont la recette match
                                    totalMatchIngredient += 1;
                                }
                            })
                            break;
                        case 'list-ustensil':
                            lengthOptionUstensil += 1;
                            getUstensil.forEach(ustensil => {
                                if(ustensil.toLowerCase() === tag.value.toLowerCase()){
                                    totalMatchUstensil += 1;
                                }
                            })
                            break;
                        case 'list-appliance':
                            lengthOptionAppliance += 1;
                            if(getAppliance){
                                if(getAppliance.toLowerCase() === tag.value.toLowerCase()){
                                    totalMatchAppliance += 1;
                                }
                            }
                            break;
                        default: break;
                    }
                })
                // Si le nombre total dont la recette a matché = le nombre d'option choisi, et que le nombre total de matching de la recette est different de 0
                if (totalMatchIngredient === lengthOptionIngredient && totalMatchIngredient !== 0){
                    // J'ajoute la recette dans le tableau d'ingrédient
                    ingredient.push(recipe);
                }
                if (totalMatchUstensil === lengthOptionUstensil && totalMatchUstensil !== 0){
                    ustensil.push(recipe);
                }
                if (totalMatchAppliance === lengthOptionAppliance && totalMatchAppliance !== 0){
                    appliance.push(recipe);
                }
            })
            // S'il y a des ingredient dans le tableau
            if(ingredient.length > 0){
                // S'il y a des ustensils en plus des ingredients
                if(ustensil.length > 0){
                    // S'il y a des appareils dans le tableau en plus des ustensils et des ingredients
                    if(appliance.length > 0){
                        // Je parcours les recettes du tableau ingrédients
                        ingredient.forEach(recipeIngredient => {
                            // Je récupère l'id de la recette
                            const idIngredientRecipe = recipeIngredient._id;
                            // Je parcours les recettes du tableau ustensiles
                            ustensil.forEach(recipeUstensil => {
                                const idUstensilRecipe = recipeUstensil._id;
                                // Je parcours les recettes du tableau appareils
                                appliance.forEach(recipeAppliance => {
                                    const idApplianceRecipe = recipeAppliance._id;
                                    if(idIngredientRecipe === idUstensilRecipe === idApplianceRecipe){
                                        // Si l'id de la recette se trouve dans ingredient, ustensiles et appareils
                                        // Alors la recette correspond à chaque tag demandé
                                        // j'ajoute la recette dans mon nouveau tableau de recettes
                                        newRecipes.push(recipeIngredient);
                                    }
                                })
                            })
                        })
                    }
                    // Sinon il y a pas d'appareil en plus d'ingredient et ustensiles
                    else{
                        // Alors je parcours les recettes dans le tableau d'ustensiles
                        ustensil.forEach(recipeUstensil => {
                            const idUstensilRecipe = recipeUstensil._id;
                            ingredient.forEach(recipeIngredient => {
                                const idIngredientRecipe = recipeIngredient._id;
                                // Si l'id de la recette se trouve dans ingredient et ustensiles
                                if (idIngredientRecipe === idUstensilRecipe) {
                                    newRecipes.push(recipeIngredient);
                                }
                            })
                        })
                    }
                }
                // Sinon s'il n'y a pas d'ustensiles mais s'il y a des appareils
                else if(appliance.length > 0 && ustensil.length <= 0){
                    ingredient.forEach(recipeIngredient => {
                        const idIngredientRecipe = recipeIngredient._id;
                        appliance.forEach(recipeAppliance => {
                            const idApplianceRecipe = recipeAppliance._id;
                            // Si l'id de la recette se trouve dans ingredient et appareils
                            if(idIngredientRecipe === idApplianceRecipe){
                                newRecipes.push(recipeIngredient);
                            }
                        })
                    })
                }
                // sinon il y a seulement des ingredient
                else {
                    ingredient.forEach(recipeIngredient => {
                        newRecipes.push(recipeIngredient);
                    })
                }
            }
            // Sinon s'il y a des ustensiles et pas d'ingredients
            else if(ustensil.length > 0 && ingredient.length <= 0) {
                // S'il y a en plus d'ustensiles des appareils
                if(appliance.length > 0){
                    ustensil.forEach(recipeUstensil => {
                        const idUstensilRecipe = recipeUstensil._id;
                        appliance.forEach(recipeAppliance => {
                            const idApplianceRecipe = recipeAppliance._id;
                            if(idApplianceRecipe === idUstensilRecipe){
                                newRecipes.push(recipeUstensil);
                            }
                        })
                    })
                }
                // Sinon il y a juste des ustensiles
                else {
                    ustensil.forEach(recipeUstensil => {
                        newRecipes.push(recipeUstensil);
                    })
                }
            }
            // Sinon si pas D'ingredient ni d'ustensil mais s'il y a des appareils
            else if(appliance.length > 0 && ingredient.length <= 0){
                appliance.forEach(appliance => {
                    newRecipes.push(appliance);
                })
            }
            // Je retourne mon nouveau tableau de recettes triées
            return new Set(newRecipes);
        }
    }
}
