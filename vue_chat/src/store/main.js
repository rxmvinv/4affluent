import {
  postOptions,
  putOptions,
  deleteOptions
} from './utils'

  const api = `${process.env.VUE_APP_API_URL}/api/entities/`

  // initial state
  const state = () => ({
    user: 'unique-user-id-1',
    entities: [],
    updatingEntity: null,
    selectedMessages: [],
    filteredList: []
  })

  const dataFetch = async (url, options) => {
    const response = await fetch(url, options || {});
    const extracted = await response.json();
    console.log(extracted);

    return extracted;
  }
  
  // getters
  const getters = {
    getListLength: (state) => state.entities.length
  }
  
  // actions
  const actions = {

    selectEntity({ commit }, selectedEntity) {
      commit('setUpdating', selectedEntity)
    },

    selectMessages({ commit, state }, messageID) {
      const toSelect = state.selectedMessages.find(msg => msg === messageID)

      commit('setSelectedMessages', {
        messageID,
        toSelect
      })

      ;(toSelect || state.updatingEntity) && commit('setUpdating')
    },

    deselectAll({commit}) {
      commit('setDefaultSelection')
    },

    fetchInitial({ commit }) {
      dataFetch(api).then(initData => {
        commit('setValues', initData)
      }).catch(e => console.log(e))
    },

    saveUpdates({ commit, state }, updatedEntity) {
      const updatedList = (Object.keys({...state.updatingEntity}).length > 0) ? //updatedList.find(ent => ent.id === updatedEntity.id)
        [...state.entities].map(ent => ent.id === updatedEntity.id ? updatedEntity : ent) :
        [...state.entities, updatedEntity]
      
      Object.keys({...state.updatingEntity}).length > 0 ? 
      
        dataFetch(`${api}${updatedEntity.id}`, putOptions(updatedEntity))
          .then(initData => {
            console.log(initData)
            commit('setValues', updatedList)
          }).catch(e => console.log(e)) :

        dataFetch(api, postOptions({
          ...updatedEntity, 
          user: state.user,
          dateTime: `${new Date()}`
        }))
          .then(initData => {
            console.log(initData)
            commit('setValues', updatedList)
          }).catch(e => console.log(e))
    },

    removeSelected({ commit, state }, selectedID) {
      const updatedList = [...state.entities].filter(ent => ent.id !== selectedID)

      dataFetch(`${api}${selectedID}`, deleteOptions()).then(initData => {
        console.log(initData)
        commit('setValues', updatedList)
      }).catch(e => console.log(e))
    },

    filterByParam({ commit, state }, filterParam) {
      let filteredData = []

      state.filteredList = [...state.entities].filter(ent => {
        // const curEnt = Object.values()

        if (ent.messageText.includes(filterParam)) {
          console.log(ent.messageText)
          filteredData.push(ent)
          console.log(filteredData)
        } 
        // else {
        //   filteredData = []
        // }

        // curEnt.map(val => {
        //   if (val.includes(filterParam)) {
        //     console.log(val, ent)
        //     filteredData.push(ent)
        //   } else {
        //     filteredData = []
        //   }
        // })

      })
      console.log(filteredData)

      commit('setFiltered', filteredData)
    }
  }
  
  // mutations
  const mutations = {
    setUpdating(state, updatingEntity) {
      state.updatingEntity = updatingEntity ? 
        {
          ...updatingEntity, 
          user: state.user
        } : { user: state.user }
    },
    setValues (state, initData) {
      state.entities = [...initData];
    },
    setSelectedMessages(state, {messageID, toSelect}) {
      state.selectedMessages = toSelect ?
        state.selectedMessages.filter(msg => msg !== messageID) :
        [...state.selectedMessages, messageID]
    },
    setDefaultSelection(state) {
      state.selectedMessages = []
      state.updatingEntity = {}
    },
    setFiltered(state, filteredValues) {
      state.filteredList = filteredValues
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }