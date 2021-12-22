<template>
  <div class="header-container">
    <SearchBar style="width: 50%" />
    <FavoriteCounter />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import FavoriteCounter from "@/components/FavoriteCounter";
export default {
  name: "Header",
  components: {FavoriteCounter, SearchBar}
}
</script>

<style scoped>
  .header-container {
    padding-left: 50px;
    padding-right: 50px;
    border: 1px solid black;
    background-color: gray;
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>