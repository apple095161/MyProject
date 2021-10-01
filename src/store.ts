import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        isLoading: false,
        OriginData: {},
        cartList: [],
        roles: '',
    },
    actions: {
        updateLoadgin (context, status) {
            context.commit('LOADING', status);
        },
        updateRoles (context, status) {
            context.commit('ROLES', status);
        },
        updateCart (context, status) {
            if (localStorage.cartId) {
                let url = `/api/v1/CartApi`;
                let local = localStorage.getItem('cartId') || '';
                let form = new FormData();
                form.append('CartID', local);
                axios.post(url, form).then((response: any) => {
                    context.commit('UPDATECART', response);
                });
            } else {
                context.commit('EMPTYCART', null);
            }
        },
    },

    mutations: {
        LOADING (state, status) {
            state.isLoading = status;
        },
        EMPTYCART (state, status) {
            state.cartList = []
        },
        UPDATECART (state, response) {
            state.OriginData = response.data.data
            state.cartList = response.data.data.purchaseList;
        },
        ROLES (state, status) {
            state.roles = status;
        }
    },
});
