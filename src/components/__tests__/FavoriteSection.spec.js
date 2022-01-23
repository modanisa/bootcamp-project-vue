import FavoriteSection from "@/components/FavoriteSection";
import {shallowMount, RouterLinkStub, createLocalVue} from "@vue/test-utils";
import VueRouter from 'vue-router'

function mountComponentConfig(favoriteProductCount) {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    return {
        localVue,
        router,
        mocks: {
            $store: {
                getters: {
                    getFavoriteProductCount: favoriteProductCount
                }
            }
        },
    }
}

describe("FavoriteSection.vue", () => {
    it("should component exist", () => {
        let componentCfg =  mountComponentConfig(0)
        const wrapper = shallowMount(FavoriteSection, componentCfg)
        expect(wrapper.exists()).toBeTruthy()
    })
    it("should link render correctly", () => {
        let componentCfg =  mountComponentConfig(0)
        componentCfg.stubs = {
            'router-link': RouterLinkStub
        }
        const wrapper = shallowMount(FavoriteSection, componentCfg)
        const link = wrapper.findComponent(RouterLinkStub)
        expect(link.props().to).toEqual("/favorites")
        expect(link.attributes().id).toEqual("favorites-link")
        expect(link.text()).toContain("Favorites")
    })
    it("should delete all favorite products exist", async () => {
        const componentCfg = mountComponentConfig(2)
        let wrapper = shallowMount(FavoriteSection, componentCfg)
        const clearAllFavorites = wrapper.find("#clear-all-favorites")
        expect(clearAllFavorites.exists()).toBeTruthy()
        expect(clearAllFavorites.text()).toEqual("Delete All Favorites")
    })
    it("should delete all button delegates properly", async () => {
        const componentCfg = mountComponentConfig(2)
        let wrapper = shallowMount(FavoriteSection, componentCfg)
        wrapper.setMethods({
            clearAllFavorites: jest.fn()
        })
        await wrapper.find("#clear-all-favorites").trigger('click')

        expect(wrapper.vm.clearAllFavorites).toHaveBeenCalled()
    })
    it("clearAllFavorites works properly", () => {
        const localThis = {
            $store: {
                dispatch: jest.fn()
            }
        }
        FavoriteSection.methods.clearAllFavorites.call(localThis)
        expect(localThis.$store.dispatch).toHaveBeenCalledWith('clearAllFavorites')
    })
    describe("favorite count", () => {
        test("exist check", () => {
            let componentCfg = mountComponentConfig(0)
            let wrapper = shallowMount(FavoriteSection, componentCfg)
            const favoriteCount = wrapper.find('#favorite-count')
            expect(favoriteCount.isVisible()).toBeFalsy()
            expect(favoriteCount.exists()).toBeTruthy()
        })
        test("should be visible when value is greater than zero", () => {
            let componentCfg = mountComponentConfig(10)
            let wrapper = shallowMount(FavoriteSection, componentCfg)
            const favoriteCount = wrapper.find('#favorite-count')
            expect(favoriteCount.isVisible()).toBeTruthy()
            expect(parseInt(favoriteCount.text())).toEqual(10)
        })
        test("should not be visible when favorite product count is zero", () => {
            let componentCfg = mountComponentConfig(0)
            let wrapper = shallowMount(FavoriteSection, componentCfg)
            const favoriteCount = wrapper.find('#favorite-count')
            expect(favoriteCount.isVisible()).toBeFalsy()
        })
    })
})