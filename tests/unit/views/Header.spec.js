import {mount} from '@vue/test-utils'
import Header from "@/views/Header";
import SearchBar from "@/components/SearchBar";
import FavoriteCounter from "@/components/FavoriteCounter";

describe("Header.vue", () => {
    it("should component exists", () => {
        const wrapper = mount(Header)
        expect(wrapper.exists()).toBeTruthy()
    })
    it("should searchbar exists", () => {
        const wrapper = mount(Header)
        const searchBar = wrapper.findComponent(SearchBar)
        expect(searchBar.exists()).toBeTruthy()
    })
    it("should favorite counter exists", () => {
        const wrapper = mount(Header)
        const favoriteCounter = wrapper.findComponent(FavoriteCounter)
        expect(favoriteCounter.exists()).toBeTruthy()
    })
})