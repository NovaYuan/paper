/**
 * Created by Choojen on 2016/12/13.
 */
'use strict';
import Vue from 'vue'
import VueResource from 'vue-resource'
import Stage from './component/stage.vue'
import Sidebar from './component/sidebar.vue'

Vue.use(VueResource);

new Vue({
    el: '#app',
    components: {Stage, Sidebar}
});
