class App {
    constructor() {
        this._recipesApi = new RecipesApi('/data/recipes.json')
        // Recettes
        this.FullRecipes = []
    }

    async fetchAllData() {
        const allData = await this._recipesApi.getRecipes()
        // Je décharge la création de la data, selon le type, dans mon factory
        const Recipes = allData.map(recipe => new RecipesFactory(recipe, 'recipeList'))
        // Je crée un nouveau tableau , et je trie les recettes par nom
        this.FullRecipes = new Set(Recipes.sort((a, b) => a.name.localeCompare(b.name)))
    }

    async main(){
        await this.fetchAllData()
        const sectionRecipes = document.getElementById('container-article')

        const Filter = new FilterRecipes(this.FullRecipes)
        await Filter.render()

        this.FullRecipes.forEach(recipes => {
            const Template = new RecipesCards(recipes)
            sectionRecipes.appendChild(
                Template.createRecipeCard()
            )
        })
    }
}

const app = new App()
app.main()
    .then(r => { return r })
    .catch(err => console.log('une erreur dans L\'App' , err))