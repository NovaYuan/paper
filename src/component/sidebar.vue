<!--created by Choojen on 2016/12/13.-->

<template lang="html">
    <div class="flex-1 side">
        <header class="flex">
            <div class="input-group flex-3">
                <input type="search" name="word" />
                <span>
                    <button class="btn" type="button">
                        <i class="fa fa-search cadetblue"></i>
                    </button>
                </span>
            </div>
            <span class="flex-1" v-if="isAuth">
                <i class="fa fa-bell"></i>
                <i>13</i>
            </span>
        </header>
        <div class="modules">
            <div class="fun" :class="{'small-modules': isShowDetail}">
                <a v-for="item in modules"
                   :style="{backgroundColor: item.bgColor}"
                   v-on:click="getModuleDetail(item.enName)">
                    {{item.name}}
                </a>
            </div>
            <div class="modules-detail" v-if="isShowDetail">
                <label></label>
            </div>
        </div>
        <section class="flex">
            <div class="flex flex-1 row-reverse">
                <div class="profile">
                    <img v-if="profileUrl"/>
                    <i class="fa fa-user-o" v-else></i>
                </div>
            </div>
            <div class="contact flex-2">
                <p>名字：Choojen</p>
                <p>Email：qiujuan.yuan@163.com</p>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        data(){
            return {
                name: "test2",
                isAuth: true,
                profileUrl: false,
                modules: Config.modules,
                isShowDetail: false
            }
        },
        methods: {
            getModuleDetail: function(key){
                this.isShowDetail = true
            }
        }
    }
</script>

<style rel="stylesheet/sass" lang="sass?indentedSyntax">
    @import "../../sass/define"
    $headerH: 40px
    $funH: 250px

    .side
        padding: $commonGap

    header
        height: $headerH
        line-height: $headerH
        box-sizing: border-box
        text-align: right

        .input-group
            input
                width: 260px

        span
            i.fa
                font-size: 1.6rem
                color: #e9967a

    .modules
        height: 24rem
        width: 24rem
        margin: $headerH auto

        .fun
            height: 100%
            a
                display: inline-block
                width: 50%
                height: 50%
                &:hover
                    cursor: pointer

        .small-modules
            height: 50px


    section
        margin: $headerH 0
        .profile
            width: 80px
            height: 80px
            border-radius: 50%
            background-color: #FF8C00
            text-align: center
            line-height: 80px
            margin-right: $commonGap
            i
                font-size: 5rem
                color: #fff
                vertical-align: middle

        .contact
            font-size: 1.4rem
</style>