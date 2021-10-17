<template>
  <div class="search-panel">
    <input class="search-field" type="text" v-on:input="searchMessage($event)" />
    <span class="icon"></span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchPanel',
  methods: {
    ...mapActions({
      filterByParam: 'main/filterByParam'
    }),
    searchMessage(ev) {
      console.log(ev.target.value)
      this.filterByParam(ev.target.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search-panel {
  border: 2px solid #7613C5;
  border-radius: 32px;
  width: 80%;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  margin: auto;
}
.search-panel .search-field {
  width: 90%;
  height: calc(100% - 4px);
  border: none;
}
.search-panel .search-field:focus-visible {
    outline: none;
}
.search-panel .icon {
  content: "";
  
  border: none;
  width: 20px;
  height: 20px;

  display: flex;
  text-indent: -9999px;

  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-image: url('../assets/search-icon.svg');
  mask-image: url('../assets/search-icon.svg');
  -webkit-mask-size: 20px 20px;
  mask-size: 20px 20px;
  background-color: #7613C5;
}
</style>
