import Vue from 'vue'
import Vuex from 'vuex'
import iddb from './../iddb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [

      {
        avaliable: true,

      }
    ],

    // filtered: []

  },
  mutations: {
    SET_ITEMS: (state, payload) => {
      state.items = payload;
    },

    // filteredProducts(state, item) {
    //   if (item) {
    //     state.filtered = item.filter((item) => item.title.toUpperCase().includes(item.toUpperCase()))
    //     console.log(state.filtered);
    //   }
    //   if (state.filtered) {
    //     console.log("state.filtered.lenght", state.filtered.lenght);
    //     state.items = [...state.filtered]
    //   }
    // }
  },
  actions: {
    async deleteItem(context, item) {
      console.log('store is being asked to delete ' + item.id);
      await iddb.deleteItem(item);
    },
    async getItems(context) {
      context.state.items = [];
      let items = await iddb.getItems();
      items.forEach(c => {
        context.state.items.push(c);
      });
    },
    async saveItem(context, item) {
      await iddb.saveItem(item);
    },


    // filteredProducts(context, item) {
    //   context.commit('filteredProducts', item)
    // }
  },
  modules: {
  },

  getters: {
    ITEMS: state => {
      return state.items;
    }
  },

})
