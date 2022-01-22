<template>
  <div>
    <div class="product-list-container"
         v-for="product of filteredProducts"
         :key="product.id">
      <ProductListItem
          class="product-list-item"
          :data-slug="product.slug"
          :isFavorite="isFavoriteProduct(product)"
          :product="product"
          />
    </div>
  </div>
</template>

<script>
import ProductListItem from "@/components/ProductListItem";
import API from "@/api";

export default {
  name: "ProductList",
  components: {ProductListItem},
  data() {
    return {
      products: [],
    }
  },
  methods: {
    isFavoriteProduct(product) {
      const favoriteProducts = this.$store.getters.getFavoriteProducts
      return favoriteProducts.findIndex(favorite => favorite.id === product.id) !== -1
    }
  },
  computed: {
    filteredProducts() {
      const text = this.$store.state.searchText.toLowerCase()
      return this.products
          .map(product => ({ ...product, search: (product.name + " " + product.description).toLowerCase() }))
          .filter(pr => pr.search.includes(text))
    }
  },
  async created() {
    try {
      this.products = await API.getProductList()
      this.products =  this.products.map(product => ({ ...product, slug: 'mervin-sal' }))
      console.table(this.products)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
.product-list-container {
  width: 25%;
  display: inline-block;
}

.product-list-item {
  padding: 20px;
}
</style>