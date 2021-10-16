<template>
  <div class="new-message-form">
    <button
      class="cancel"
      v-on:click="deselectAll()"
    ></button>
    <textarea type="text"
      v-model="updatingEntity.messageText"
      v-on:input="insertForm({messageText: $event.target.value})"
      v-on:change="insertForm({messageText: $event.target.value})"
    ></textarea>
    <button
      class="commit-changes"
      v-on:click="commitChanges()"
      v-bind:disabled="(updatingEntity.messageText <= 0)"  
    ></button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'MessageForm',
  data() {
    return {
      updatingEntity: this.selectedEntity || {}
    }
  },
  computed: {
    ...mapState({
      selectedEntity: state => state.main.updatingEntity
    }),
    ...mapGetters({
      listLength: 'main/getListLength'
    })
  },
  watch: {
    selectedEntity(newValue) {
      if (newValue) {this.updatingEntity = newValue}
    },
    listLength(newValue) {
      if (newValue && !this.updateEntity) {
        this.updatingEntity = {id: this.listLength + 1}
      }
    }
  },
  methods: {
    ...mapActions({
      selectEntity: 'main/selectEntity',
      saveUpdates: 'main/saveUpdates',
      deselectAll: 'main/deselectAll'
    }),
    insertForm(userInput) {
      this.updatingEntity = {
        ...this.updatingEntity,
        ...userInput
      }
    },
    commitChanges() {
      (this.updatingEntity.messageText.length > 0) && 
        this.saveUpdates(this.updatingEntity)
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
.new-message-form {
  background: #EDF5F6;
  width: 100vw;
  height: 85px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.new-message-form textarea {
  box-shadow: inset 1px 0px 1px 1px rgba(185, 185, 185, 0.25);
  border: none;
  background: none;
  width: 60vw;
  height: 45px;
  resize: none;

  font-family: Poppins;
  font-size: 15px;
  color: #938C8C;
}
.new-message-form .cancel {
  background-color: #61ACF1;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.new-message-form .commit-changes {
  background-color: #7613C5;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.new-message-form .commit-changes::before {
  content: "";

  border: none;
  width: 20px;
  height: 20px;

  display: flex;
  text-indent: -9999px;

  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-image: url('../assets/send.svg');
  mask-image: url('../assets/send.svg');
  -webkit-mask-size: 20px 20px;
  mask-size: 20px 20px;
  background-color: #fff;
  margin: auto;
}

.new-message-form .cancel::before {
  content: "";

  border: none;
  width: 20px;
  height: 20px;

  display: flex;
  text-indent: -9999px;

  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-image: url('../assets/cancel.svg');
  mask-image: url('../assets/cancel.svg');
  -webkit-mask-size: 20px 20px;
  mask-size: 20px 20px;
  background-color: #fff;
  margin: auto;
}
</style>
