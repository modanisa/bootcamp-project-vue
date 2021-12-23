<template>
  <div>
    <div class="product-list-container"
         v-for="product of products" :key="product.id">
      <ProductListItem
          :isFavorite="isFavoriteProduct(product)"
          :product="product"
          class="product-list-item"/>
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
      products: []
    }
  },
  methods: {
    isFavoriteProduct(product) {
      const favoriteProducts = this.$store.getters.getFavoriteProducts
      return favoriteProducts.findIndex(favorite => favorite.id === product.id) !== -1
    }
  },
  async created() {
    try {
      this.products = await API.getProductList()
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