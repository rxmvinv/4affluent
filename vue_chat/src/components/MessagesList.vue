<template>
  <transition-group name="messages-list" tag="div" class="messages-list">
    <Message 
      v-for="entity in entities"
      v-bind:key="entity.id"
      v-bind:messageEntity="entity"
    />
  </transition-group>
</template>

<script>
import { mapState } from 'vuex';
import Message from "./Message.vue"

export default {
  name: 'MessagesList',
  components: {
    Message
  },
  computed: {
    ...mapState({
      entities: state => state.main.entities,
    })
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
</style>
