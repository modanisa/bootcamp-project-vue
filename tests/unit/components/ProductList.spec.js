import {mount, shallowMount} from '@vue/test-utils'
import ProductList from "@/components/ProductList";
import ProductListItem from "@/components/ProductListItem";
import API from "@/api";
import flushPromises from "flush-promises";

jest.mock('@/api')

describe("ProductList.vue", () => {
    it("should component exists", async () => {
        const wrapper = mount(ProductList)
        expect(wrapper.exists()).toBeTruthy()
    })
    it("should render product list item components correctly", async () => {
        const mockResponse = [
            {
                "id": 1,
                "name": "Tesettür Dünyası",
                "description": "Desenli Mevlana Elbise TSD4414 Turuncu",
                "image": "https://fns.modanisa.com/r/pro2/2021/11/01/n-desenli-mevlana-elbise-tsd4414-turuncu-8067476-7.jpg"
            },
            {
                "id": 2,
                "name": "Mervin Şal",
                "description": "Paşmina Desenli Şal - Karışık Renkli - Mervin Şal",
                "image": "https://fns.modanisa.com/r/pro2/2018/07/25/n-pasmina-desenli-sal--karisik-renkli--mervin-sal-516070-516070-2.jpg"
            },
            {
                "id": 3,
                "name": "Şalevi",
                "description": "İnci Şal - Siyah - Şal Evi",
                "image": "https://fns.modanisa.com/r/pro2/2020/10/05/n-inci-sal--siyah--sal-evi-1809885-1809885-1.jpg"
            }
        ]
        API.getProductList.mockResolvedValue(mockResponse)
        const wrapper = mount(ProductList)
        await flushPromises()

        const productItemComponents = wrapper.findAllComponents(ProductListItem)
        expect(productItemComponents).toHaveLength(mockResponse.length)

        const wrapperArr = productItemComponents.wrappers
        for (let i in wrapperArr) {
            expect(wrapperArr[i].props('product')).toStrictEqual(mockResponse[i])
        }
    })
})