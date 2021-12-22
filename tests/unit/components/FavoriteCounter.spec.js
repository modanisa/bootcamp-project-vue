import { mount } from '@vue/test-utils'
import FavoriteCounter from "@/components/FavoriteCounter";

describe("FavoriteCounter.vue", () => {
    it("should component exists", () => {
        const wrapper = mount(FavoriteCounter)
        expect(wrapper.exists()).toBeTruthy()
    })
    it("should number of favorite count exists", () => {
        const wrapper = mount(FavoriteCounter)
        const countContainer = wrapper.find('span')
        expect(countContainer.exists()).toBeTruthy()
        expect(countContainer.text()).not.toBeNull()
    })
    it("should favorite count text exist and match", () => {
        const wrapper = mount(FavoriteCounter)
        const textContainer = wrapper.find('p')
        expect(textContainer.text()).toContain("Favorite Count: ")
    })
})