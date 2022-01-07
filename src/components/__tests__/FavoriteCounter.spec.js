import {createLocalVue, mount} from '@vue/test-utils'
import FavoriteCounter from "@/components/FavoriteCounter";
import {getters, state} from "@/store";
import Vuex from 'vuex';
import router from "@/router";

describe("FavoriteCounter.vue", () => {
    it("should component exists", () => {
        const wrapper = mountComponent()
        expect(wrapper.exists()).toBeTruthy()
    })
    it("should number of favorite count exists", () => {
        const wrapper = mountComponent()
        const countContainer = wrapper.find('span')
        expect(countContainer.exists()).toBeTruthy()
        expect(countContainer.text()).not.toBeNull()
    })
    it("should favorite count text exist and match", () => {
        const wrapper = mountComponent()
        const textContainer = wrapper.find('p')
        expect(textContainer.text()).toContain("Favorites: ")
    })
})

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    return mount(FavoriteCounter, {
        localVue,
        router,
        store: new Vuex.Store({
            state,
            getters
        })
    });
}
