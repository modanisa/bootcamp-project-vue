<template>
  <pre>{{ favoriteProducts }}</pre>
</template>

<script>
export default {
  name: "FavoriteList",
  computed: {
    favoriteProducts() {
      return this.$store.state.favoriteProducts;
    }
  },
}
</script>

<style scoped>

</style>