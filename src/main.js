import Vue from 'vue'
import App from './App.vue'
import Validator from '../plugins/Validator';

Vue.use(Validator);

new Vue({
    el: '#app',
    render: h => h(App)
});
