import {mount} from '@vue/test-utils'
import ProductListItem from "@/components/ProductListItem";

describe("ProductListItem.vue", () => {
    describe("exists check", () => {
        let wrapper
        beforeEach(() => {
            wrapper = mount(ProductListItem, {
                propsData: {
                    product: {}
                }
            })
        })
        it("should component exists", () => {
            expect(wrapper.exists()).toBeTruthy()
        })
        it("should render favorite button", () => {
            const favorite = wrapper.find('#favorite')
            expect(favorite.exists()).toBeTruthy()
            expect(favorite.text()).toEqual("Favorite")
        })
        it("should render product img", () => {
            const img = wrapper.find('img')
            expect(img.exists()).toBeTruthy()
        })
        it("should render product title", () => {
            const title = wrapper.find("#title")
            expect(title.exists()).toBeTruthy()
        })
        it("should render summary title", () => {
            const summary = wrapper.find("#summary")
            expect(summary.exists()).toBeTruthy()
        })
        it("should render go to detail button", () => {
            const goToDetail = wrapper.find("#detail")
            expect(goToDetail.exists()).toBeTruthy()
            expect(goToDetail.text()).toEqual("Go to Detail")
        })
    })
    describe('check favoriteBtnStyle functionality', () => {
        const testCases = [
            {
                caseName: 'when product selected as favorite',
                initialFavoriteProductValue: false,
                expectedStyle: { 'background-color': 'gray' }
            }
        ]
        for (let testCase of testCases) {
            it(testCase.caseName, () => {
                const localThis = {
                    favoriteProduct: testCase.initialFavoriteProductValue
                }
                const style = ProductListItem.computed.favoriteBtnStyle.call(localThis)
                expect(style).toStrictEqual(testCase.expectedStyle)
            })
        }
    })
    it('render product prop correctly', () => {
        const product =  {
            "id": 1,
            "name": "Tesettür Dünyası",
            "description": "Desenli Mevlana Elbise TSD4414 Turuncu",
            "image": "https://fns.modanisa.com/r/pro2/2021/11/01/n-desenli-mevlana-elbise-tsd4414-turuncu-8067476-7.jpg"
        }
        const wrapper = mount(ProductListItem, {
            propsData: {
                product
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.find('img').attributes('src')).toEqual(product.image)
        expect(wrapper.find("#title").text()).toEqual(product.name)
        expect(wrapper.find("#summary").text()).toContain(product.description)
    })
    it("check favoriteToggle functionality", () => {
        const localThis = {
            favoriteProduct: false
        }

        ProductListItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteProduct).toBeTruthy()

        ProductListItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteProduct).toBeFalsy()

        ProductListItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteProduct).toBeTruthy()
    })
})