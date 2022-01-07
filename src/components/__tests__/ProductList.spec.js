import {createLocalVue, mount} from '@vue/test-utils'
import ProductList from "@/components/ProductList";
import ProductListItem from "@/components/ProductListItem";
import API from "@/api";
import flushPromises from "flush-promises";
import Vuex from "vuex";
import {getters, state} from "@/store";

jest.mock('@/api')

describe("ProductList.vue", () => {
    it("should component exists", () => {
        API.getProductList.mockResolvedValue([])
        const wrapper = mountComponent(ProductList)
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
        const wrapper = mountComponent(ProductList)
        wrapper.vm.isFavoriteProduct = jest.fn()

        await flushPromises()
        const productItemComponents = wrapper.findAllComponents(ProductListItem)
        expect(productItemComponents).toHaveLength(mockResponse.length)
    })
    it("should filter product list by searched text correctly", () => {
        let products = [
            {
                "id": 1,
                "name": "Tesettür Dünyası",
                "description": "Desenli Mevlana Elbise TSD4414 Turuncu",
                "image": "https://fns.modanisa.com/r/pro2/2021/11/01/n-desenli-mevlana-elbise-tsd4414-turuncu-8067476-7.jpg",
            },
            {
                "id": 7,
                "name": "Refka",
                "description": "Kapüşonlu Triko Yelek - Antrasit - Refka Basic",
                "image": "https://fns.modanisa.com/r/pro2/2021/06/07/n-kapusonlu-kolsuz-triko-hirka--antrasit--refka-basic-8003772-7.jpg",
            },
            {
                "id": 9,
                "name": "Sweatshirt",
                "description": "Kapüşonlu Baskılı",
                "image": "https://fns.modanisa.com/r/pro2/2021/11/05/n-kapusonlu-baskili-sweatshirt-8142878-8142878-1.jpg",
            }
        ]

        const localThis = {
            products,
            $store: {
                state: {
                    searchText: 'el'
                }
            }
        }

        const filteredProducts = ProductList.computed.filteredProducts.call(localThis)
        products.splice(products.length - 1, 1)

        expect(filteredProducts).toHaveLength(products.length)

        filteredProducts.forEach(fPro => {
            delete fPro.search
        })
        expect(filteredProducts).toStrictEqual(products)
    })
})

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    return mount(ProductList, {
        localVue,
        store: new Vuex.Store({
            state,
            getters
        })
    });
}
