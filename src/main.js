/**
 * Created by Choojen on 2016/12/13.
 */
'use strict';
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Stage from './component/stage.vue'
import Sidebar from './component/sidebar.vue'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.filter("date", function(value, format){
    var type = typeof value,
        date = value;

    switch (type){
        case "string":
            if(date.match(/^[0-9]+$/)){
                date = parseInt(date);
            }
            date = new Date(date);

            var year = date.getFullYear(),
                m = date.getMonth() + 1,
                month = m > 9 ? m : "0" + m,
                da = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
                hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours(),
                minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(),
                sec = date.getSeconds() > 9 ? date.getSeconds(): "0" + date.getSeconds();

            switch (format){
                case "yyyy-MM-dd hh:mm:ss":
                    return year + "-" + month + "-" + da + " " + hours + ":" + minutes + ":" + sec;
                default:
                    return year + "-" + month + "-" + da;
            }
    }
});

var router = new VueRouter({
    routes: [
        { path: '/:service/:id', component: Stage },
        { path: '*', component: Stage}
    ]
});

new Vue({
    el: '#app',
    router,
    components: {Sidebar}
});
