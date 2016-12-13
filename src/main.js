/**
 * Created by Choojen on 2016/12/13.
 */
'use strict';
import Vue from 'vue'
import Test from './test/test.vue' //测试用例
import Sidebar from './component/sidebar.vue'

new Vue({
    el: '#app',
    components: { Test, Sidebar }
});