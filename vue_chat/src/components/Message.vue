<template>
  <div
    class="message"
    v-on:click="switchMode($event, entity.id)"
    v-bind:class="{
      'right-column': entity.user === currentUser,
      'left-column': entity.user !== currentUser,
      active: isSelected,
      unactive: !isSelected
    }"
  >

    <div class="avatar-column">
      <div
        :style="{
          backgroundImage: entity.user ?
          `url(/assets/avatars/${ entity.user }-avatar.png)` :
          `url(/assets/avatars/${ 'default' }-avatar.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }"
        class="avatar"
      ></div>

      <div class="date-time">
        <span>{{ entity.dateTime }}</span>
      </div>
    </div>

    <div class="text">
      <div class="text-shape"></div>
      <span>{{ entity.messageText }}</span>
    </div>

    <div class="action-buttons">
      <button 
        v-if="selectedMessages.length === 1"
        v-on:click="selectEntity(entity)" class="edit"
      ></button>
      <button v-on:click="removeEntity(entity.id)" class="remove"></button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'Message',
  data() {
    return {
      entity: {
        ...this.messageEntity,
        dateTime: moment(this.messageEntity.dateTime).format('HH:mm')
      }
    }
  },
  props: {
    messageEntity: Object
  },
  methods: {
    ...mapActions({
      selectEntity: 'main/selectEntity',
      selectMessages: 'main/selectMessages',
      removeSelected: 'main/removeSelected'
    }),
    removeEntity(selectedID) {
      this.removeSelected(selectedID)
    },
    switchMode(ev, selectedMessage) {
      (ev.target.nodeName !== "BUTTON") ?
      this.selectMessages(selectedMessage) :
      ev.preventDefault()
    }
  },
  computed: {
    ...mapState({
      selectedMessages: state => state.main.selectedMessages,
      currentUser: state => state.main.user
    }),
    isSelected() {
      return this.selectedMessages.find(msg => msg === this.messageEntity.id)
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
.message {
  display: flex;
  align-items: flex-start;
  margin: 5px 0;
  padding: 0 15px;
}
.message.active {
  background: rgba(207, 203, 203, 0.7);
}
.message.left-column {
  flex-direction: row;
}
.message.right-column {
  flex-direction: row-reverse;
}
.message .avatar-column {
  margin-top: 5px;
}
.action-buttons {
  align-self: center;
}
.action-buttons .edit {
  border: none;
  width: 20px;
  height: 20px;

  display: flex;
  text-indent: -9999px;

  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-image: url('../assets/edit-icon.svg');
  mask-image: url('../assets/edit-icon.svg');
  -webkit-mask-size: 20px 20px;
  mask-size: 20px 20px;
  background-color: rgba(77, 200, 126, 0.51);

  cursor: pointer;
}
.action-buttons .remove {
  border: none;
  width: 20px;
  height: 20px;

  display: flex;
  text-indent: -9999px;

  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-image: url('../assets/remove-icon.svg');
  mask-image: url('../assets/remove-icon.svg');
  -webkit-mask-size: 20px 20px;
  mask-size: 20px 20px;
  background-color: rgba(244, 57, 57, 1);

  cursor: pointer;
}
.active .action-buttons {
  display: flex;
  animation: expandactions 0.3s linear forwards;
}
.unactive .action-buttons {
  display: flex;
  animation: releaseactions 0.3s linear forwards;
}
.action-buttons button {
  margin: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
}
.message .date-time {
  color: #D2D2D2;
  font-family: Poppins;
  font-size: 15px;
}
.message .text {
  background: rgba(158, 235, 189, 0.51);
  padding: 10px 12px;
  margin: 0 25px;
  display: flex;
  position: relative;
  margin-top: 15px;
  font-family: Poppins;
  font-size: 15px;
  max-width: 50%;
  text-align: left;
}
.message.left-column .text {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  margin-right: auto;
  margin-bottom: 15px;
}
.message.right-column .text {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 5px;
  margin-left: auto;
  margin-bottom: 15px;
}

.message.left-column .text .text-shape {
  content: "";
  display: block;
  overflow: hidden;
  height: 20px;
  /* 
  width: 20px;
  background: rgba(158, 235, 189, 0.51); 
  */
  position: absolute;
  left: -20px;
  top: 0;
  border-top: 20px solid rgba(158, 235, 189, 0.51);
  border-top-color: rgba(158, 235, 189, 0.51); 
  border-left: 20px solid transparent; 
  /*   border-right: 20px solid transparent;  */
}

.message.right-column .text .text-shape {
  content: "";
  display: block;
  overflow: hidden;
  height: 20px;
  /* 
  width: 20px;
  background: rgba(158, 235, 189, 0.51);
  */
  position: absolute;
  right: -20px;
  top: 0;

  border-top: 20px solid rgba(158, 235, 189, 0.51);
  border-top-color: rgba(158, 235, 189, 0.51); 
  /* border-left: 20px solid transparent; */
  border-right: 20px solid transparent; 
}

@keyframes releaseactions {
  0% {
    display: flex;
    opacity: 1;
  }
  99% {
    display: flex;
    opacity: 0;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
@keyframes expandactions {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
