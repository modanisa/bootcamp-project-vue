<template>
  <div>
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
  </div>
</template>

<script>
import API from "@/api";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: {}
    }
  },
  async created() {
    this.product = await API.getProductBySlug(this.$route.params.slug)
  }
}
</script>

<style scoped>

</style>