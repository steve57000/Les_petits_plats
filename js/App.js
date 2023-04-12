class App {
    constructor() {
        this._recipesApi = new RecipesApi('/data/recipes.json')
        // Recettes
        this.FullRecipes = []
    }

    // Fonction pour récupérer la data
    async fetchAllData() {
        const allData = await this._recipesApi.getRecipes()
        // Je décharge la création de la data, selon le type, dans mon factory
        const Recipes = allData.map(recipe => new RecipesFactory(recipe, 'recipeList'))
        // Je crée un nouveau tableau , et je trie les recettes par nom
        this.FullRecipes = new Set(Recipes.sort((a, b) => a.name.localeCompare(b.name)))
    }

    async main(){
        // J'appel ma fonction pour récupérer les données
        await this.fetchAllData()
        const sectionRecipes = document.getElementById('container-article')
        // Mise en place du systeme de filtrage
        const Filter = new FilterRecipes(this.FullRecipes)
        await Filter.render()
        // Je parcours le tableau des recettes
        this.FullRecipes.forEach(recipes => {
            // Pour chaque recette, j'appel le modèle de création de recette
            const Template = new RecipesCards(recipes)
            sectionRecipes.appendChild(
                // et enfin j'injecte dans le dom le rendu du modèle
                Template.createRecipeCard()
            )
        })
    }
}

const app = new App()
app.main()
    .then(r => { return r })
    .catch(err => console.log('une erreur dans L\'App' , err))