import ProductDetail from "@/views/ProductDetail";
import {shallowMount} from "@vue/test-utils";

describe('Product Detail.vue', () => {
    test('component exist', () => {
        const wrapper = shallowMount(ProductDetail)
        expect(wrapper.exists()).toBeTruthy()
    })
    test("component title should render correctly", () => {
        let product = {
            "id": 2,
            "name": "Mervin Şal",
            "description": "Paşmina Desenli Şal - Karışık Renkli - Mervin Şal",
            "image": "https://fns.modanisa.com/r/pro2/2018/07/25/n-pasmina-desenli-sal--karisik-renkli--mervin-sal-516070-516070-2.jpg",
            "slug": "mervin-sal",
        }

        const wrapper = shallowMount(ProductDetail, {
            propsData: {
                product
            }
        })
        expect(wrapper.find('h1').text()).toEqual(product.name)
    })
})