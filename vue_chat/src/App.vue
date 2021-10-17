<template>
  <div class="app">
    <SearchPanel />
    <MessagesList />
    <MessageForm />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import MessagesList from './components/MessagesList.vue'
import MessageForm from './components/MessageForm.vue'
import SearchPanel from './components/SearchPanel.vue'

export default {
  name: 'App',
  components: {
    MessagesList,
    MessageForm,
    SearchPanel
  },
  methods: {
    ...mapActions({
      fetchInitial: 'main/fetchInitial'
    })
  },
  mounted() {
    this.fetchInitial();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
body {
  margin: 0;
}
.messages-list {
  margin-top: 20px;
  margin-bottom: 100px;
}
.new-message-form {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
