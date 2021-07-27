import Vue from 'vue';
import App from './App.vue';
import {routes} from "@/routes";
import VueRouter from "vue-router";
import {store} from "@/store";
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router: new VueRouter({
        routes,
    }),
    store,
}).$mount('#app')
