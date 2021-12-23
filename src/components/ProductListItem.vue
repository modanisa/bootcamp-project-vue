<template>
  <div class="product-list-item-container">
    <button id="favorite"
            @click="favoriteToggle"
            :style="favoriteBtnStyle">Favorite
    </button>
    <img id="image"
         :src="product.image"
         alt="Product Image">
    <p id="title">{{ product.name }}</p>
    <p id="summary">{{ product.description }}</p>
    <button id="detail">Go to Detail</button>
  </div>
</template>

<script>
export default {
  name: "ProductListItem",
  props: {
    product: {
      id: Number,
      name: String,
      description: String,
      image: String,
    }
  },
  data() {
    return {
      favoriteProduct: false
    }
  },
  computed: {
    favoriteBtnStyle() {
      return {
        'background-color': this.favoriteProduct ? 'red' : 'gray'
      }
    }
  },
  methods: {
    favoriteToggle() {
      this.favoriteProduct = !this.favoriteProduct
      this.$store.dispatch('onFavoriteStatusChanged', {
        product: this.product,
        isFavorite: this.favoriteProduct,
      })
    }
  }
}
</script>

<style scoped>
.product-list-item-container {
}

#favorite {
  float: right;
}

#image {
  width: 100%;
  display: inline-block;
  background-size: cover;
}

#detail {
  width: 100%;
  font-size: 18px;
  padding: 15px;
  font-weight: bolder;
  text-align: center;
}
</style>