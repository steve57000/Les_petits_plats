class RecipesFactory {
    constructor(data, type){
        // Si le type correspond à l'ancienne API, alors retourne moi l'ancien formattage
        if (type === 'recipeList') {
            return new Recipes(data)
        }
        // Une bonne pratique est de throw une erreur si le format n'est pas reconnu
        else {
            throw 'Unknown type format'
        }
    }
}