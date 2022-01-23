import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
    favoriteProducts: [],
    searchText: ''
}

export const getters = {
    getFavoriteProducts: state => state.favoriteProducts,
    getFavoriteProductCount: state => state.favoriteProducts.length
}

export const mutations = {
    addFavoriteProduct(state, product) {
        state.favoriteProducts.push(product)
    },
    removeFavoriteProduct(state, rProduct) {
        const index = state.favoriteProducts.findIndex((product) => product.id === rProduct.id)
        if (index !== -1) {
            state.favoriteProducts.splice(index, 1)
        }
    },
    setSearchText(state, text) {
        state.searchText = text
    },
    clearAllFavorites(state) {
        state.favoriteProducts = []
    }
}

export const actions = {
    onFavoriteStatusChanged(context, payload) {
        const {product, isFavorite} = payload
        if (isFavorite) {
            context.commit('addFavoriteProduct', product)
        } else {
            context.commit('removeFavoriteProduct', product)
        }
    },
    onSearchTextChanged(context, payload) {
        const {text} = payload
        context.commit('setSearchText', text)
    },
    clearAllFavorites(context, payload) {
        context.commit('clearAllFavorites')
    }
}

export default new Vuex.Store({
    getters,
    state,
    mutations,
    actions,
    modules: {}
})
