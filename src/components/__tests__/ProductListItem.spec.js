import {createLocalVue, mount, shallowMount} from '@vue/test-utils'
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

    it.each`
        caseName | initialFavoriteProductValue | expectedStyle 
        ${'when product selected as favorite'} | ${false} | ${{'background-color': 'gray'}}
    `('returns $expectedStyle when $caseName with $initialFavoriteProductValue',
        ({caseName, initialFavoriteProductValue, expectedStyle}) => {
            const localThis = {
                favoriteProduct: initialFavoriteProductValue
            }
            const style = ProductListItem.computed.favoriteBtnStyle.call(localThis)
            expect(style).toStrictEqual(expectedStyle)
        });

    describe('check favoriteBtnStyle functionality', () => {
        const testCases = [
            {
                caseName: 'when product selected as favorite',
                initialFavoriteProductValue: false,
                expectedStyle: {'background-color': 'gray'}
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
        const product = {
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
        const product = {
            "id": 1,
            "name": "Tesettür Dünyası",
            "description": "Desenli Mevlana Elbise TSD4414 Turuncu",
            "image": "https://fns.modanisa.com/r/pro2/2021/11/01/n-desenli-mevlana-elbise-tsd4414-turuncu-8067476-7.jpg"
        }

        let dispatch = jest.fn()

        const localThis = {
            product,
            favoriteProduct: false,
            $store: {
                dispatch
            }
        }

        ProductListItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteProduct).toBeTruthy()
        expect(dispatch).toHaveBeenCalledWith('onFavoriteStatusChanged', {product: localThis.product, isFavorite: true})

        ProductListItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteProduct).toBeFalsy()
        expect(dispatch).toHaveBeenCalledWith('onFavoriteStatusChanged', {
            product: localThis.product,
            isFavorite: false
        })

        ProductListItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteProduct).toBeTruthy()
        expect(dispatch).toHaveBeenCalledWith('onFavoriteStatusChanged', {product: localThis.product, isFavorite: true})
    })

    test('when user click detail button should navigate to product detail', async () => {
        const goToDetailSpy = jest.spyOn(ProductListItem.methods, 'goToDetail')

        let product = {
            "id": 2,
            "name": "Mervin Şal",
            "description": "Paşmina Desenli Şal - Karışık Renkli - Mervin Şal",
            "image": "https://fns.modanisa.com/r/pro2/2018/07/25/n-pasmina-desenli-sal--karisik-renkli--mervin-sal-516070-516070-2.jpg",
            "slug": "mervin-sal",
        }
        let routerPushMock = jest.fn()

        const wrapper = shallowMount(ProductListItem, {
            propsData: {
                product
            },
            mocks: {
                $router: {
                    push: routerPushMock
                }
            }
        })

        const button = wrapper.find("#detail")
        await button.trigger('click')

        expect(routerPushMock).toHaveBeenCalledWith("/" + product.slug)
    })
})