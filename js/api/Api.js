class Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(data => {
                const { recipes } = data
                return recipes
            })
            .catch(err => console.log('an error occurs', err))
    }
}

class RecipesApi extends Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        super(url)
    }

    async getRecipes() {
        return await this.get()
    }

}

