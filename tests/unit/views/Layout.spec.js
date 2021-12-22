import { mount } from '@vue/test-utils'
import Layout from "@/views/Layout";
import Header from "@/views/Header";

describe("Layout.vue", () => {
    it("should component exists", () => {
        const wrapper = mount(Layout)
        expect(wrapper.exists()).toBeTruthy()
    })
    it("header exists", () => {
        const wrapper = mount(Layout)
        const header = wrapper.findComponent(Header)
        expect(header.exists()).toBeTruthy()
    })
})