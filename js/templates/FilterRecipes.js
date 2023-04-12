// Contient un formulaire de selection ainsi que le code pour les filtres des recettes
class FilterRecipes {
    constructor(Recipes) {
        this.Recipes = Recipes

        this.$searchInputPrincipal = document.querySelector('#search-recipe')
        this.$recipesWrapper = document.querySelector('#container-article')
        this.$wrapperListIngredients = document.querySelector('#list-ingredient')
        this.$wrapperListAppliances = document.querySelector('#list-appliance')
        this.$wrapperListUstensils = document.querySelector('#list-ustensil')
        this.$wrapperErrorMessage = document.getElementById('error-message')
        this.allInputList = document.querySelectorAll('.container-search input')

        this.FullIngredient = []
        this.FullUstensil = []
        this.FullAppliance = []
    }
    // Fonction pour faire le lien avec l'adapter, selon l'objet filtre créer par l'utilisateur, et retourner le nouveau template
    async filterRecipes(optionValue, option) {
        this.allInputList.forEach(input => {
            input.disabled = false
        })
        // appel de l'adapter avec l'objet client
        const AdaptedFilterLib = new FilterRecipeAdapter(this.Recipes, option, optionValue)
        // attente du retour de l'adapté
        const FilteredRecipes = await AdaptedFilterLib.filterByOption()
        //Appel Fonction d'éffacement des recettes contenu en element du dom
        this.clearRecipesWrapper()

        // Si le retour du résultat du filtre ne renvoi aucune recette
        if(FilteredRecipes.size === 0){
            const listRandomName = [] // j'initie une list vide de nom de recette
            const listRandomIngredient = [] // j'initie une liste vide de nom d'ingredient
            this.Recipes.forEach(recipe => {
                // J'ajoute dans chaque tableau, les noms de recettes et ingrédient
                listRandomName.push(recipe._name)
                const ingredient = recipe._ingredients
                ingredient.forEach(ingredient => listRandomIngredient.push(ingredient['ingredient']))
            })
            // je crée une variable qui prendra un nom au hasard dans le tableau
            const randomNameRecipeOne = listRandomName[Math.floor(Math.random()*(50 - 25) + 25)]
            const randomNameRecipeTwo = listRandomIngredient[Math.floor(Math.random()*(25 - 1) + 1)]
            // Je crée mon element dom qui contiendra le message d'erreur
            const spanMsgError = document.createElement('span')
            spanMsgError.innerHTML = `Aucune recettes trouvées, essayer plutôt ceci: "${randomNameRecipeOne}" ou "${randomNameRecipeTwo} "`
            // Et enfin j'injecte l'element erreur dans le dom
            this.$wrapperErrorMessage.appendChild(spanMsgError)
            setTimeout(()=> {
                this.$wrapperErrorMessage.removeChild(spanMsgError)
            },5000)
        }
        else{
            // S'il y a une seul recette restante, je désactive la liste de filtre ainsi que l'input de chaque liste
            if(FilteredRecipes.size === 1){
                this.$wrapperListUstensils.innerHTML = ''
                this.$wrapperListIngredients.innerHTML = ''
                this.$wrapperListAppliances.innerHTML = ''

                this.allInputList.forEach(input => {
                    input.disabled = true
                })
                // j'ajoute un message en remplacement de la liste, afin d'indiqué à l'utilisateur que les filtres ne sont plus possible
                const spanMessage = document.createElement('span')
                spanMessage.innerHTML = 'Vous ne pouvez plus ajouter de filtre'
                this.$wrapperListUstensils.innerHTML = 'Filtre ustensile impossible, 1 recette restante'
                this.$wrapperListIngredients.innerHTML = 'Filtre ingrédient impossible, 1 recette restante'
                this.$wrapperListAppliances.innerHTML = 'Filtre apparareils impossible, 1 recette restante'
                FilteredRecipes.forEach(Recipe => {
                    const Template = new RecipesCards(Recipe)
                    this.$recipesWrapper.appendChild(Template.createRecipeCard())
                })
            }
            else{
                // Sinon il y a plus de 1 recette
                FilteredRecipes.forEach(Recipe => {
                    const Template = new RecipesCards(Recipe)
                    this.$recipesWrapper.appendChild(Template.createRecipeCard())
                })
                this.createDropdownList(FilteredRecipes)
            }

        }
    }
    // Fonction pour faire le lien avec l'adapter, selon l'objet filtre créer par l'utilisateur, et retourner le nouveau modèle de liste
    async filterListItem(optionValue, option) {
        let wrapperList
        let arrayList
        let msgList
        // On vérifie la valeur d'option
        switch(option) {
            case 'list-ingredient':
                wrapperList = this.$wrapperListIngredients
                arrayList = this.FullIngredient
                msgList = 'Ingrédient'
                break
            case 'list-ustensil':
                wrapperList = this.$wrapperListUstensils
                arrayList = this.FullUstensil
                msgList = 'Ustensile'
                break
            case 'list-appliance':
                wrapperList = this.$wrapperListAppliances
                arrayList = this.FullAppliance
                msgList = 'Appareil'
                break
            default: break
        }

        const AdaptedFilterLib = new FilterRecipeAdapter(arrayList, option, optionValue)
        const FilteredRecipes = await AdaptedFilterLib.filterByOption()

        this.clearListWrapper(wrapperList)
        this.$searchInputPrincipal.value = ''
        if(FilteredRecipes.size <= 0){
            wrapperList.innerHTML = `Oups...Je ne trouve pas d'${msgList}`
        }
        else{
            FilteredRecipes.forEach(list => {
                const Template = new DropdownList(list, wrapperList)
                wrapperList.appendChild((Template.createDropdownList()))
            })
            this.onClickItem()
        }
    }

    onSearchDropdownList(){
        const getInputDropdown = document.querySelectorAll('#search-ingredient, #search-appliance, #search-ustensil')
        getInputDropdown.forEach(input => {
            input.addEventListener('input', async e => {
                const inputTarget = e.target
                let inputValue = e.target.value
                const option = inputTarget.getAttribute('data-list')
                if (inputValue.length > 2) {
                    await this.filterListItem(inputValue, option)
                } else {
                    await this.filterListItem('', option)
                }
            })
        })
    }

    createDropdownList(recipes){
        let fullIngredient = []
        let fullUstensil = []
        let fullAppliance = []
        const data = fetchDataFilter(recipes)
        data.FullIngredient.forEach(ingredientFilterList => {
            fullIngredient.push(ingredientFilterList)
            const Template = new DropdownList(ingredientFilterList, this.$wrapperListIngredients)
            this.$wrapperListIngredients.appendChild((Template.createDropdownList()))
        })
        data.FullAppliances.forEach(applianceFilterList => {
            fullAppliance.push(applianceFilterList)
            const Template = new DropdownList(applianceFilterList, this.$wrapperListAppliances)
            this.$wrapperListAppliances.appendChild((Template.createDropdownList()))
        })
        data.FullUstensils.forEach(ustensilFilterList => {
            fullUstensil.push(ustensilFilterList)
            const Template = new DropdownList(ustensilFilterList, this.$wrapperListUstensils)
            this.$wrapperListUstensils.appendChild((Template.createDropdownList()))
        })
        this.FullIngredient = new Set(fullIngredient)
        this.FullUstensil = new Set(fullUstensil)
        this.FullAppliance = new Set(fullAppliance)
        this.onClickItem()
        this.onSearchDropdownList()
    }

    onChangeFilter() {
        this.$searchInputPrincipal
        .addEventListener('input', async (e) => {
            const option = 'search-all'
            const optionValue = e.target.value

            if(optionValue.length > 2) {
                if(document.querySelector('.tag')){
                    const tagElement = document.querySelectorAll('.tag')
                    tagElement.forEach(tag => {
                        const tagInfo = [{
                            'value' : tag.textContent,
                            'wrapperTag' : tag.getAttribute('data-list'),
                            'typeFilter': tag.getAttribute('data-type')
                        }]
                        this.getTag(tagInfo)
                    })
                }
                else{
                    await this.filterRecipes(optionValue, option)
                }
            }
            else{
                await this.getTagFilter(option)
            }
        })
    }

    onRemoveTag() {
        if(document.querySelector('.button-remove')){
            const tagDom = document.querySelectorAll('.button-remove')
            tagDom.forEach(closeTag => {
                closeTag.addEventListener('click', async e => {
                    const elementTarget = e.target
                    const parentRemove = elementTarget.parentNode
                    const hasPreviousTag = parentRemove.previousElementSibling

                    parentRemove.remove()

                    if(hasPreviousTag){
                        const selectPreviousTag = hasPreviousTag.childNodes[0]
                        const dataList = selectPreviousTag.getAttribute('data-list')
                        const dataType = selectPreviousTag.getAttribute('data-type')
                        const tagInfo = [{
                            'value' : selectPreviousTag.textContent,
                            'wrapperTag' : dataList,
                            'typeFilter': dataType
                        }]
                        await this.filterRecipes(tagInfo, 'all-filter')
                    }
                    else{
                        const option = 'search-all'
                        await this.getTagFilter(option)
                    }
                })
            })
        }
    }

    // Function pour vérifier si des tags existent et retourner les recettes filtré
    async getTagFilter(option) {
        // Si un element dans le document correspond à mon selecteur .tag
        if (document.querySelector('.tag')) {
            // Alors je récupère tout les tags
            const tagElement = document.querySelectorAll('.tag')
            tagElement.forEach( tag => {
                // Pour chaque tag je crée un tableau de données
                const tagInfo = [{
                    'value': tag.textContent, // Je récupère la valeur du tag
                    // Je récupère le nom d'option du filtre auquel il appartient (list-ingredient ou list-appliance ou...)
                    'wrapperTag': tag.getAttribute('data-list'),
                    // Ici je récupère le nom du container auquel le tag appartient
                    'typeFilter': tag.getAttribute('data-type')
                }]
                // Et enfin je libère ma fonction, je délègue la recherche des recettes
                this.getTag(tagInfo)
            })
        } else {
            // Sinon aucun tag existe, je peux filtrer et retourner toutes les recettes
            await this.filterRecipes('', option)
        }
    }

    onClickItem(){
        const itemslist = document.querySelectorAll('.select-items')
        itemslist.forEach(itemList => {
            itemList.addEventListener('click', (e) => {
                const element = e.target
                const tagElement = new ListItemSelect(element)
                const tagInfo = [{
                    'value' : tagElement._itemSelect.attributes.value.nodeValue,
                    'wrapperTag' : tagElement.containerId,
                    'typeFilter': tagElement.typeListFilter
                }]
                const getTag = this.getTag(tagInfo)
                if(getTag){
                    tagElement.createTagItem()
                    this.onRemoveTag()
                }
            })
        })
    }

    getTag(tagInfo){
        let listTag = []
        let valid = false

        // const domSelectorContainerTag = tagInfo.wrapperTag
        tagInfo.forEach(tag => {
            const domElement = document.querySelector(`${tag.wrapperTag}`)
            console.log(domElement)
            if (domElement.childNodes.length === 0 && !document.querySelector('.tag')) {
                valid = true
                listTag.push(tag)
            }
            else {
                const getTag = document.querySelectorAll('.tag')
                let existTag
                getTag.forEach(tagValue => {
                    console.log(tagValue.parentElement)
                    const newTag = {
                        'value' : tagValue.textContent,
                        'wrapperTag' : tagValue.getAttribute('data-list'),
                        'typeFilter': tagValue.getAttribute('data-type')
                    }
                    listTag.push(newTag)
                    existTag = tag.value.toLowerCase() !== newTag.value.toLowerCase()
                })
                if(existTag) {
                    valid = true
                    listTag.push(tag)
                }
                else {
                    valid = false
                }
            }
        })
        if(valid){
            const newArrayList = new Set(listTag)
            const option = 'all-filter'
            this.filterRecipes(newArrayList, option)
            return true
        }
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ""
        this.$wrapperListIngredients.innerHTML = ""
        this.$wrapperListAppliances.innerHTML = ""
        this.$wrapperListUstensils.innerHTML = ""
        this.$wrapperErrorMessage.innerHTML = ''
    }

    clearListWrapper(wrapper) {
        wrapper.innerHTML = ''
    }

    async render() {
        this.createDropdownList(this.Recipes)
        this.onChangeFilter()
        this.onClickItem()
    }
}


