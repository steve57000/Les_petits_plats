const fetchDataFilter = (ListRecipes) => {
    // création du tableau de toutes les recettes
    let fullRecipes = []
    // recherche et création de la list des appareils depuis le tableau des recettes
    let fullListIngredient = []
    let fullListUstencils = []
    let fullListAppliances = []
    ListRecipes.forEach(recipe => {
        const recipeIngredient = recipe._ingredients
        const recipeAppliances = recipe._appliances.toLowerCase()
        const recipeUstensils = recipe._ustensils
        fullRecipes.push(recipe)
        recipeIngredient.forEach(listIngredients => {
            const ingredients = listIngredients['ingredient'].toLowerCase()
            fullListIngredient.push(ingredients.charAt(0).toUpperCase() + ingredients.slice(1))
        })
        recipeUstensils.forEach(ustensils => {
            const ustensilsName = ustensils.toLowerCase()
            fullListUstencils.push(ustensilsName.charAt(0).toUpperCase() + ustensilsName.slice(1))
        })
        if(recipeAppliances !== 'undefined'){
            const appliancesName = recipeAppliances.toLowerCase()
            fullListAppliances.push(appliancesName.charAt(0).toUpperCase() + appliancesName.slice(1))
        }
    })
    // Je remplis mes tableaux de filtre en supprimant les doublons avec new Set()
    // et ranger alphabétiquement avec Array.sort()
    const FullRecipes = new Set(fullRecipes.sort())
    const FullIngredient = new Set(fullListIngredient.sort())
    const FullAppliances = new Set(fullListAppliances.sort())
    const FullUstensils = new Set(fullListUstencils.sort())
    return {FullRecipes:FullRecipes, FullAppliances:FullAppliances, FullIngredient:FullIngredient, FullUstensils:FullUstensils}

}


const createListItem = (recipes) => {
    const data = fetchDataFilter(recipes)
    const listFiltre = [
        {
            data: data.FullIngredient,
            container: document.getElementById('list-ingredient')
        },
        {
            data: data.FullUstensils,
            container: document.getElementById('list-ustensil')
        },
        {
            data: data.FullAppliances,
            container: document.getElementById('list-appliance')
        }
    ]
    listFiltre.forEach(listItem => {
        console.log(listItem.data)
        const Filter = new FilterRecipesItems(listItem.data, listItem.container, data.FullRecipes)
        Filter.render()
        listItem.container.innerHTML = ''
        listItem.data.forEach(item => {
            const Template = new DropdownList(item, listItem.container)
            listItem.container.appendChild(Template.createDropdownList())
        })
    })

}