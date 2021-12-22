<template>
  <div class="layout-container">
    <Header />
    <ProductList />
  </div>
</template>

<script>
import Header from "@/views/Header";
import ProductList from "@/components/ProductList";

export default {
  name: "Layout",
  components: {
    ProductList,
    Header
  }
}
</script>

<style scoped>
  .layout-container {
    margin: 0 auto;
    width: 960px;
  }
</style>