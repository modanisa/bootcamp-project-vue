<template>
  <p>
    <router-link :to="{name: 'FavoriteList'}">Favoriteler: <span>{{favoriteProductCount}}</span></router-link>
  </p>
</template>

<script>
export default {
  name: "FavoriteCounter",
  computed: {
    favoriteProductCount() {
      return this.$store.getters.getFavoriteProductCount
    },
  },
}
</script>

<style scoped>
p {
  font-size: 40px;
  color: white;
  font-weight: bolder;
}
</style>