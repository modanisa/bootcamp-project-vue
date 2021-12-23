import {actions, mutations, state} from "@/store";

describe('mutation tests', () => {
    it('should add favorite product successfully', () => {
        const addedProduct = {
            "id": 1,
            "name": "Şalevi",
            "description": "İnci Şal - Siyah - Şal Evi",
            "image": "https://fns.modanisa.com/r/pro2/2020/10/05/n-inci-sal--siyah--sal-evi-1809885-1809885-1.jpg"
        }
        mutations.addFavoriteProduct(state, addedProduct)
        expect(state.favoriteProducts).toHaveLength(1)
    })
    describe('should remove favorite product', () => {
        const removeProduct = {
            id: 1
        }

        it('when favorite product is empty', () => {
            mutations.removeFavoriteProduct(state, removeProduct)
            expect(state.favoriteProducts).toHaveLength(0)
        })
        it('when favorite product has some products', () => {
            state.favoriteProducts.push({ id: 1 }, { id: 2 }, { id: 3 })
            mutations.removeFavoriteProduct(state, removeProduct)
            expect(state.favoriteProducts).toHaveLength(2)
        })
    })
})

describe('actions tests', () => {
    const product = {
        "id": 1,
        "name": "Şalevi",
        "description": "İnci Şal - Siyah - Şal Evi",
        "image": "https://fns.modanisa.com/r/pro2/2020/10/05/n-inci-sal--siyah--sal-evi-1809885-1809885-1.jpg"
    }
    it('when a product selected as favorite', () => {
        let commit = jest.fn()
        actions.onFavoriteStatusChanged({ commit }, product, true)
        expect(commit).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith('addFavoriteProduct', product)
    })
    it('when a product removed from favorite', () => {
        let commit = jest.fn()
        actions.onFavoriteStatusChanged({commit}, product, false)
        expect(commit).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith('removeFavoriteProduct', product)
    })
})