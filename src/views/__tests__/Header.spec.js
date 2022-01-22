import {shallowMount} from '@vue/test-utils'
import Header from "@/views/Header";
import SearchBar from "@/components/SearchBar";

describe("Header.vue", () => {
    it("should component exists", () => {
        const wrapper = shallowMount(Header)
        expect(wrapper.exists()).toBeTruthy()
    })
    it("should searchbar exists", () => {
        const wrapper = shallowMount(Header)
        const searchBar = wrapper.findComponent(SearchBar)
        expect(searchBar.exists()).toBeTruthy()
    })
    it("renders header correctly", () => {
        const wrapper = shallowMount(Header)
        expect(wrapper.element).toMatchSnapshot()
    })
})