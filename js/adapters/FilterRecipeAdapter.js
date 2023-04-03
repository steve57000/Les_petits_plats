class FilterRecipeAdapter {
    constructor( Recipes, option, valueOption ) {
        this.Recipes = Recipes
        this.option = option
        this.valueOption = valueOption
    }
    async filterByOption() {
        return Filter.filterByOption(this.option, this.valueOption, this.Recipes)
    }
}