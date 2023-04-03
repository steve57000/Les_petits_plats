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
            Recipes.forEach(recipe => {
                const ingredientsMatches = recipe._ingredients

                ingredientsMatches.forEach(ingredient => {
                    const ingredientMatches = ingredient['ingredient']
                    if(ingredientMatches.toLowerCase().includes(valueOption.toLowerCase())){
                        newRecipes.push(recipe)
                    }
                })
                if(ingredientsMatches === true){
                    newRecipes.push(recipe)
                }
                if(recipe._name.toLowerCase().includes(valueOption.toLowerCase())){
                    newRecipes.push(recipe)
                }
                if(recipe._descriptions.toLowerCase().includes(valueOption.toLowerCase())){
                    newRecipes.push(recipe)
                }
            })
            return new Set(newRecipes)
        }
        else if(option === 'list-ingredient'){
            let newList = []
            // je parcours la list d'ingredients contenu dans Recipes
            Recipes.forEach(listIngredient => {
                if(listIngredient.toLowerCase().includes(valueOption.toLowerCase())){
                    // Si dans la list d'ingrédient la valeur corresond à la valeur de l'option
                    // J'ajoute l'ingredient dans mon array
                    newList.push(listIngredient)
                }
            })
            // Enfin je retourne un nouveau tableau de la liste créer
            return new Set(newList)
        }
        else if(option === 'list-ustensil'){
            let newList = []
            Recipes.forEach(listUstensil => {
                // Si ustensile existe dans la recette
                if(listUstensil){
                    if(listUstensil.toLowerCase().includes(valueOption.toLowerCase())) {
                        // Si dans la list d'ustensil la valeur corresond à la valeur de l'option
                        newList.push(listUstensil)
                    }
                }
            })
            return new Set(newList)
        }
        else if(option === 'list-appliance'){
            let newList = []
            Recipes.forEach(listAppliance => {
                if(listAppliance.toLowerCase().includes(valueOption.toLowerCase())){
                    newList.push(listAppliance)
                }
            })
            return new Set(newList)
        }
        else if(option === 'all-filter'){
            let newRecipes = []
            let ingredient = []
            let ustensil = []
            let appliance = []
            let newRecipe = false

            Recipes.forEach(recipe => {
                const getIngredient = recipe._ingredients
                const getUstensil = recipe._ustensils
                const getAppliance = recipe._appliances
                let lengthOptionIngredient = 0
                let lengthOptionUstensil = 0
                let lengthOptionAppliance = 0
                let totalMatchIngredient = 0
                let totalMatchUstensil = 0
                let totalMatchAppliance = 0

                valueOption.forEach(tag => {
                    const tagTypeFilter = tag.typeFilter

                    switch(tagTypeFilter){
                        case 'list-ingredient':
                            lengthOptionIngredient += 1
                            let ingredientMatches
                            getIngredient.forEach(ingredient => {
                                ingredientMatches = ingredient['ingredient']
                                if(ingredientMatches.toLowerCase() === tag.value.toLowerCase()){
                                    totalMatchIngredient += 1
                                }
                            })
                            break
                        case 'list-ustensil':
                            lengthOptionUstensil += 1
                            getUstensil.forEach(ustensil => {
                                if(ustensil.toLowerCase() === tag.value.toLowerCase()){
                                    totalMatchUstensil += 1
                                }
                            })
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
                })
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
            })

            if(ingredient.length > 0){
                console.log("il y a ingredient")

                if(ustensil.length > 0){
                    console.log("il y a ustensil en plus d'ingredient")
                    if(appliance.length > 0){
                        console.log("il y a appareil en plus d'ingredient et ustensil")
                        ingredient.forEach(recipeIngredient => {
                            const idIngredientRecipe = recipeIngredient._id
                            ustensil.forEach(recipeUstensil => {
                                const idUstensilRecipe = recipeUstensil._id
                                console.log('je recherche dans ustensil')
                                appliance.forEach(recipeAppliance => {
                                    console.log('je cherche l id ingredient dans ustensil')
                                    const idApplianceRecipe = recipeAppliance._id
                                    if(idIngredientRecipe === idUstensilRecipe === idApplianceRecipe){
                                        newRecipes.push(recipeIngredient)
                                    }
                                })
                            })
                        })
                    }
                    else{
                        ustensil.forEach(recipeUstensil => {
                            const idUstensilRecipe = recipeUstensil._id
                            console.log('je recherche dans ustensil')
                            ingredient.forEach(recipeIngredient => {
                                console.log('je cherche l id ingredient dans ustensil')
                                const idIngredientRecipe = recipeIngredient._id
                                if (idIngredientRecipe === idUstensilRecipe) {
                                    newRecipes.push(recipeIngredient)
                                }
                            })
                        })
                    }
                }
                else if(appliance.length > 0 && ustensil.length <= 0){
                    console.log("il y a appareil en plus d'ingredient et ustensil")
                    ingredient.forEach(recipeIngredient => {
                        const idIngredientRecipe = recipeIngredient._id
                        appliance.forEach(recipeAppliance => {
                            console.log('je cherche l id ingredient dans ustensil')
                            const idApplianceRecipe = recipeAppliance._id
                            if(idIngredientRecipe === idApplianceRecipe){
                                newRecipes.push(recipeIngredient)
                            }
                        })
                    })
                }
                else {
                    ingredient.forEach(recipeIngredient => {
                        console.log(recipeIngredient)
                        newRecipes.push(recipeIngredient)
                    })
                }
            }
            else if(ustensil.length > 0 && ingredient.length <= 0) {
                console.log("il y a ustensil")
                if(appliance.length > 0){
                    console.log("il y a ingredient en plus d'ustensil")

                    ustensil.forEach(recipeUstensil => {
                        const idUstensilRecipe = recipeUstensil._id
                        console.log('je recherche dans ustensil')
                        appliance.forEach(recipeAppliance => {
                            console.log('je cherche l id ingredient dans ustensil')
                            const idApplianceRecipe = recipeAppliance._id
                            if(idApplianceRecipe === idUstensilRecipe){
                                newRecipes.push(recipeUstensil)
                            }
                        })
                    })
                }
                else {
                    ustensil.forEach(recipeUstensil => {
                        console.log(recipeUstensil)
                        newRecipes.push(recipeUstensil)
                    })
                }
            }
            else if(appliance.length > 0 && ingredient.length <= 0){
                appliance.forEach(appliance => {
                    newRecipes.push(appliance)
                })
            }
            return new Set(newRecipes)
        }
    }
}
