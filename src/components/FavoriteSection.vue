<template>
  <div>
    <button id="clear-all-favorites"
    @click="clearAllFavorites"
    >Delete All Favorites</button>
    <router-link id="favorites-link" to="/favorites">
      Favorites
      <span
          v-show="getFavoriteCount !== 0"
          id="favorite-count">
        {{ getFavoriteCount }}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FavoriteSection",
  methods: {
    clearAllFavorites() {
      this.$store.dispatch('clearAllFavorites')
    }
  },
  computed: {
    getFavoriteCount() {
      return this.$store.getters.getFavoriteProductCount
    }
  }
}
</script>

<style scoped>

</style>