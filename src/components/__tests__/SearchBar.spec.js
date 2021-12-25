import { mount } from '@vue/test-utils'
import SearchBar from "@/components/SearchBar";

describe("SearchBar.vue", () => {
    it("should component exists", () => {
        const wrapper = mount(SearchBar)
        expect(wrapper.exists()).toBeTruthy()
    })
    it("when text changes should save to the store", () => {
        const mock = jest.fn()
        const localThis = {
            $store: {
                dispatch: mock
            }
        }
        SearchBar.methods.onTextChange.call(localThis, "a", "")
        expect(mock).toHaveBeenCalledWith("onSearchTextChanged", { text: 'a' })
    })
})