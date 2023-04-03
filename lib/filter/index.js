class Filter {
    /**
     *
     * @param {string} option
     * @param {*} valueOption
     * @param {array} Recipes
     * @returns
     */
    static async filterByOption(option, valueOption,  Recipes) {
        await new Promise(resolve => setTimeout(resolve, 200))
        console.log(option)
        console.log(valueOption)

        if(option === 'search-all'){
            console.log('valeur recu: ' + valueOption + 'option recu:' + option)
            let newRecipes = []
            for(let recipe of Recipes) {
                const ingredientsMatches = recipe._ingredients
                console.log(ingredientsMatches)
                for(let ingredient of ingredientsMatches) {
                    const ingredientMatches = ingredient['ingredient']
                    if(ingredientMatches.toLowerCase().includes(valueOption.toLowerCase())){
                        newRecipes.push(recipe)
                    }
                }
                if(ingredientsMatches === true){
                    newRecipes.push(recipe)
                }
                if(recipe._name.toLowerCase().includes(valueOption.toLowerCase())){
                    newRecipes.push(recipe)
                }
                if(recipe._descriptions.toLowerCase().includes(valueOption.toLowerCase())){
                    newRecipes.push(recipe)
                }
            }
            return new Set(newRecipes)
        }
        else if(option === 'list-ingredient'){
            let newList = []
            // je parcours la list d'ingredients contenu dans Recipes
            for(let listIngredient of Recipes) {
                if(listIngredient.toLowerCase().includes(valueOption.toLowerCase())){
                    // Si dans la list d'ingrédient la valeur corresond à la valeur de l'option
                    // J'ajoute l'ingredient dans mon array
                    newList.push(listIngredient)
                }
            }
            // Enfin je retourne un nouveau tableau de la liste créer
            return new Set(newList)
        }
        else if(option === 'list-ustensil'){
            let newList = []
            for(let listUstensil of Recipes) {
                // Si ustensile existe dans la recette
                if(listUstensil){
                    if(listUstensil.toLowerCase().includes(valueOption.toLowerCase())) {
                        // Si dans la list d'ustensil la valeur corresond à la valeur de l'option
                        newList.push(listUstensil)
                    }
                }
            }
            return new Set(newList)
        }
        else if(option === 'list-appliance'){
            let newList = []
            for(let listAppliance of Recipes) {
                if(listAppliance.toLowerCase().includes(valueOption.toLowerCase())){
                    newList.push(listAppliance)
                }
            }
            return new Set(newList)
        }
        else if(option === 'all-filter'){
            let newRecipes = []
            let ingredient = []
            let ustensil = []
            let appliance = []
            let newRecipe = false

            for(let recipe of Recipes) {
                const getIngredient = recipe._ingredients
                const getUstensil = recipe._ustensils
                const getAppliance = recipe._appliances
                let lengthOptionIngredient = 0
                let lengthOptionUstensil = 0
                let lengthOptionAppliance = 0
                let totalMatchIngredient = 0
                let totalMatchUstensil = 0
                let totalMatchAppliance = 0

                for(let tag of valueOption) {
                    const tagTypeFilter = tag.typeFilter

                    switch(tagTypeFilter){
                        case 'list-ingredient':
                            lengthOptionIngredient += 1
                            let ingredientMatches
                            for(let ingredient of getIngredient) {
                                ingredientMatches = ingredient['ingredient']
                                if(ingredientMatches.toLowerCase() === tag.value.toLowerCase()){
                                    totalMatchIngredient += 1
                                }
                            }
                            break
                        case 'list-ustensil':
                            lengthOptionUstensil += 1
                            for(let ustensil of getUstensil) {
                                if(ustensil.toLowerCase() === tag.value.toLowerCase()){
                                    totalMatchUstensil += 1
                                }
                            }
                            break
                        case 'list-appliance':
                            lengthOptionAppliance += 1
                            if(getAppliance){
                                if(getAppliance.toLowerCase() === tag.value.toLowerCase()){
                                    totalMatchAppliance += 1
                                }
                            }
                            break
                        default: break
                    }
                }
                if (totalMatchIngredient === lengthOptionIngredient && totalMatchIngredient !== 0){
                    newRecipe = true
                    // return recipe
                    ingredient.push(recipe)
                }
                if (totalMatchUstensil === lengthOptionUstensil && totalMatchUstensil !== 0){
                    newRecipe = true
                    // return recipe
                    ustensil.push(recipe)
                }
                if (totalMatchAppliance === lengthOptionAppliance && totalMatchAppliance !== 0){
                    newRecipe = true
                    // return recipe
                    appliance.push(recipe)
                }
            }

            if(ingredient.length > 0){
                console.log("il y a ingredient")

                if(ustensil.length > 0){
                    console.log("il y a ustensil en plus d'ingredient")
                    if(appliance.length > 0){
                        console.log("il y a appareil en plus d'ingredient et ustensil")
                        for(let recipeIngredient of ingredient) {
                            const idIngredientRecipe = recipeIngredient._id
                            for(let recipeUstensil of ustensil) {
                                const idUstensilRecipe = recipeUstensil._id
                                console.log('je recherche dans ustensil')
                                for(let recipeAppliance of appliance) {
                                    console.log('je cherche l id ingredient dans ustensil')
                                    const idApplianceRecipe = recipeAppliance._id
                                    if(idIngredientRecipe === idUstensilRecipe === idApplianceRecipe){
                                        newRecipes.push(recipeIngredient)
                                    }
                                }
                            }
                        }
                    }
                    else{
                        for(let recipeUstensil of ustensil) {
                            const idUstensilRecipe = recipeUstensil._id
                            console.log('je recherche dans ustensil')
                            for(let recipeIngredient of ingredient) {
                                console.log('je cherche l id ingredient dans ustensil')
                                const idIngredientRecipe = recipeIngredient._id
                                if (idIngredientRecipe === idUstensilRecipe) {
                                    newRecipes.push(recipeIngredient)
                                }
                            }
                        }
                    }
                }
                else if(appliance.length > 0 && ustensil.length <= 0){
                    console.log("il y a appareil en plus d'ingredient et ustensil")
                    for(let recipeIngredient of ingredient) {
                        const idIngredientRecipe = recipeIngredient._id
                        for(let recipeAppliance of appliance) {
                            console.log('je cherche l id ingredient dans ustensil')
                            const idApplianceRecipe = recipeAppliance._id
                            if(idIngredientRecipe === idApplianceRecipe){
                                newRecipes.push(recipeIngredient)
                            }
                        }
                    }
                }
                else {
                    for(let recipeIngredient of ingredient) {
                        newRecipes.push(recipeIngredient)
                    }
                }
            }
            else if(ustensil.length > 0 && ingredient.length <= 0) {
                console.log("il y a ustensil")
                if(appliance.length > 0){
                    console.log("il y a ingredient en plus d'ustensil")

                    for(let recipeUstensil of ustensil) {
                        const idUstensilRecipe = recipeUstensil._id
                        console.log('je recherche dans ustensil')
                        for(let recipeAppliance of appliance) {
                            console.log('je cherche l id ingredient dans ustensil')
                            const idApplianceRecipe = recipeAppliance._id
                            if(idApplianceRecipe === idUstensilRecipe){
                                newRecipes.push(recipeUstensil)
                            }
                        }
                    }
                }
                else {
                    for(let recipeUstensil of ustensil) {
                        console.log(recipeUstensil)
                        newRecipes.push(recipeUstensil)
                    }
                }
            }
            else if(appliance.length > 0 && ingredient.length <= 0){
                for(let recipeAppliance of appliance) {
                    newRecipes.push(recipeAppliance)
                }
            }
            return new Set(newRecipes)
        }
    }
}
