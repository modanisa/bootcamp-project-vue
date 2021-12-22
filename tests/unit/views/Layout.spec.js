import { mount } from '@vue/test-utils'
import Layout from "@/views/Layout";
import Header from "@/views/Header";
import ProductList from "@/components/ProductList";

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
    it("product list exists", () => {
        const wrapper = mount(Layout)
        const productList = wrapper.findComponent(ProductList)
        expect(productList.exists()).toBeTruthy()
    })
})