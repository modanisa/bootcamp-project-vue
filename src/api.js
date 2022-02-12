import axios from 'axios'
import adapter from "axios/lib/adapters/http";

axios.defaults.adapter = adapter;

export class API {
    useProxy = false
    constructor(url, useProxy) {
        this.useProxy = useProxy

        if (url === undefined || url === "") {
            url = process.env.VUE_APP_BASE_API_URL;
        }
        if (url.endsWith("/")) {
            url = url.substr(0, url.length - 1)
        }
        this.url = url
    }

    withPath(path) {
        if (this.useProxy) {
            return path
        }

        if (!path.startsWith("/")) {
            path = "/" + path
        }
        return `${this.url}${path}`
    }

    async getProductList() {
        return axios.get(this.withPath('/api/v1/products')).then(r => r.data)
    }

    async getProductBySlug(slug) {
        return Promise.resolve({
            "id": 2,
            "name": "Mervin Şal",
            "slug": "mervin-sal",
            "description": "Paşmina Desenli Şal - Karışık Renkli - Mervin Şal",
            "image": "https://fns.modanisa.com/r/pro2/2018/07/25/n-pasmina-desenli-sal--karisik-renkli--mervin-sal-516070-516070-2.jpg"
        })
    }
}

export default new API(process.env.VUE_APP_BASE_API_URL, true);
