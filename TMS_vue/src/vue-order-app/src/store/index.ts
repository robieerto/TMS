import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    orders: []
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    ADD_ORDER(state, order) {
      state.orders.push(order)
    }
  },
  actions: {
    async fetchOrders({ commit }) {
      const response = await axios.get(`${__API_URL__}/api/v1/orders/`)
      commit('SET_ORDERS', response.data)
    },
    async createOrder({ commit }, order) {
      const response = await axios.post(`${__API_URL__}/api/v1/orders/`, order)
      commit('ADD_ORDER', response.data)
    }
  },
  getters: {
    allOrders: (state) => state.orders
  }
})

export default store