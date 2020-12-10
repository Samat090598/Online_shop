import Vue from 'vue'
import Vuex from 'vuex'

import commonActions from "./actions/actions";
import apiRequest from "./actions/api-request";
import getters from "./getters/getters";
import mutations from "./mutations/mutations";

const actions = {...commonActions, ...apiRequest}

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: []
    },
    mutations,
    actions,
    getters
});

export default store;