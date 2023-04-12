class FilterRecipeAdapter {
    // Je récupère l'objet créer par le client et instancie l'adapter
    constructor( Recipes, option, valueOption ) {
        this.Recipes = Recipes
        this.option = option
        this.valueOption = valueOption
    }
    async filterByOption() {
        // Transposition entre l'ancienne et la nouvelle librairie
        //L'adapter appel l'adapté
        return Filter.filterByOption(this.option, this.valueOption, this.Recipes)
    }
}

// L’Adapter Pattern vous permet de migrer simplement des API ou des interfaces incompatibles.
// J'utilise un dossier lib à la racine du projet qui correspond à une simulation d'api externe