import {createLocalVue, mount} from '@vue/test-utils'
import FavoriteList from "@/views/FavoriteList";
import Vuex from "vuex";
import {getters, state} from "@/store";

describe("FavoriteList.vue", () => {
    it("should component exists", () => {
        const wrapper = mountComponent()
        expect(wrapper.exists()).toBeTruthy()
    })
})

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    return mount(FavoriteList, {
        localVue,
        store: new Vuex.Store({
            state,
            getters
        })
    });
}