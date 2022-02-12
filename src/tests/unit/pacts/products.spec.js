import {pactWith} from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
const { eachLike, like, integer } = Matchers
import {API} from "@/api";

pactWith({
    consumer: "Frontend",
    provider: "Backend",
}, provider => {
    describe("products", () => {
        let api
        beforeEach(() => {
            api = new API(provider.mockService.baseUrl, false)
        })
        test('get product list', async () => {
            await provider.addInteraction({
                state: 'get product list successfully',
                uponReceiving: 'a request not empty for product list',
                withRequest: {
                    method: 'GET',
                    path: '/api/v1/products',
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: eachLike({
                        id: integer(1),
                        name: like("tavin"),
                        slug: like("tavin"),
                        description: like('tavin marka kıyafet'),
                        image: like('https://fns.modanisa.com/r/pro2/2021/11/01/n-desenli-mevlana-elbise-tsd4414-turuncu-8067476-7.jpg')
                    })
                }
            })
            const res = await api.getProductList()
            expect(res[0].id).toEqual(1)
        })
    })
})
