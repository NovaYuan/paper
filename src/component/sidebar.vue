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
                   v-on:click="getModuleDetail(item)">
                    {{item.name}}
                </a>
            </div>
            <h4 v-if="detailItem"
                :style="{color: detailItem.bgColor}">{{detailItem.name}}</h4>

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
                isShowDetail: false,
                detailItem: ""
            }
        },
        methods: {
            getModuleDetail: function(item){
                this.isShowDetail = !this.isShowDetail;
                this.detailItem = "";

                setTimeout(function(){
                    if(this.isShowDetail){
                        this.detailItem = item;
                    }
                }.bind(this), 300);
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

        h4
            display: inline-block
            font: bold 2.1rem/50px "Microsoft YaHei"
            color: #999
            margin-left: 10px
            @include transition(display 1s, font-size 1s)

            &:after
                content: "—————"
                font-weight: normal
                font-size: 20px
                margin-left: 5px

            &:before
                content: "—"
                font-weight: normal
                font-size: 20px
                margin-right: 5px

        .fun
            height: 100%
            width: 100%
            font-size: 0
            @include transform(0deg)
            @include transition(width .5s, height .5s)

            a
                display: inline-block
                width: 50%
                height: 50%
                font: bold 2rem/12rem "Microsoft YaHei"
                text-align: center
                color: #fff
                transition: font .5s, color .5s, transform 1s
                &:hover
                    cursor: pointer

        .fun.small-modules
            height: 50px
            width: 50px
            font-size: 0
            display: inline-block
            float: left
            @include transform(360deg)

            a
                color: rgba(255, 255, 255, 0)
                font: bold 0rem/0rem "Microsoft YaHei"

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