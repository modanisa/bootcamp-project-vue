import { mount } from '@vue/test-utils'
import SearchBar from "@/components/SearchBar";

describe("SearchBar.vue", () => {
    it("should component exists", () => {
        const wrapper = mount(SearchBar)
        expect(wrapper.exists()).toBeTruthy()
    })
})