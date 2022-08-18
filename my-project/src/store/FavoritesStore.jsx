import { makeAutoObservable } from "mobx";    

export default class FavoritesStore {

    constructor() {
        this._favoritesID = []
        this._favorites = []

        makeAutoObservable(this)

    }
    getLocalFavorites(store) {
        if (localStorage.getItem('favorites') != null) {
            this._favorites = []
            const cart = JSON.parse(localStorage.getItem('favorites'));
            cart.map(i => this._favorites.push(i) )
        }
            
    }
    
    removeItem(product) {
        for (let step = 0; step < this._favorites.length; step++) {
            this._favorites.map((item, index )=> {
                if (item.id === product.id) {
                    this._favorites.splice(index, 1);
                } 
                
                 return null
            })
    
            if (this._favorites.length < 1) {
                localStorage.removeItem('favorites')
            }

        }

        if (this._favorites.length !== 0) {
            setTimeout(() => {
                localStorage.setItem('favorites', JSON.stringify(this._favorites))
            }, 600);
        }
    }
  
    get favorites() {
        return this._favorites
    }
    get favoritesID() {
        return this._favoritesID
    }
}  