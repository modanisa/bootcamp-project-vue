<template>
  <input id="searchbar"
         v-model="text"
         type="text" placeholder="Search..." />
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      text: ''
    }
  },
  watch: {
    text: 'onTextChange'
  },
  methods: {
    onTextChange(newVal, oldVal) {
      this.$store.dispatch('onSearchTextChanged', { text: newVal })
    }
  }
}
</script>

<style scoped>
  #searchbar {
    font-size: 20px;
    text-align: left;
    background-color: #42b983;
    padding: 14px;
  }
</style>