import ProductDetail from "@/views/ProductDetail";
import {shallowMount} from "@vue/test-utils";
import API from "@/api";
import flushPromises from "flush-promises";

jest.mock('@/api')

function mountComponent() {
    return shallowMount(ProductDetail, {
        mocks: {
            $route: {
                params: {
                    slug: 'melvin-sal'
                }
            },
        }
    })
}

describe('Product Detail.vue', () => {
    test('component exist', () => {
        const wrapper = mountComponent()
        expect(wrapper.exists()).toBeTruthy()
    })
    test("component title should render correctly", async () => {
        let product = {
            "id": 2,
            "name": "Mervin Şal",
            "description": "Paşmina Desenli Şal - Karışık Renkli - Mervin Şal",
            "image": "https://fns.modanisa.com/r/pro2/2018/07/25/n-pasmina-desenli-sal--karisik-renkli--mervin-sal-516070-516070-2.jpg",
            "slug": "mervin-sal",
        }
        API.getProductBySlug.mockResolvedValue(product)
        const wrapper = mountComponent()
        await flushPromises()

        expect(wrapper.find('h1').text()).toEqual(product.name)
        expect(wrapper.find('p').text()).toEqual(product.description)
    })
})