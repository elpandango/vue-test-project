import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        productList: {},
    },
    mutations: {
        setProductList(state, payload) {
            state.productList = {...payload};
        }
    },
    actions: {
        setProductList({commit}, payload) {
            commit('setProductList', payload);
        }
    },
    getters: {
        productList: state => {
            return state.productList;
        }
    }
});