import Vue from 'vue'
import Vuex from 'vuex'
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE'

Vue.use(Vuex)

const state = {
  active: 'wutheringHeights'
}

const mutations = {
  [CHANGE_ACTIVE] (state, newState) {
    state = newState
  }
}
// let state = {
//   state: {
//     active: 'WutheringHeights'
//   },
//   mutations: {
//     [CHANGE_ACTIVE] (state, newState) {
//       state = newState
//     }
//   }
// }

export default new Vuex.Store({
  state,
  mutations
})
