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
                <i class="fa fa-plus"></i>
            </span>
        </header>
        <div class="modules">
            <div class="fun"
                 :class="{'small-modules': isShowDetail}">
                <a v-for="item in modules"
                   :style="{backgroundColor: item.bgColor}"
                   v-on:click="getModuleDetail(item)">
                    {{item.name}}
                </a>
            </div>
            <h4 v-if="detailTitle"
                :style="{color: detailTitle.bgColor}">{{detailTitle.name}}</h4>

            <div class="modules-detail" v-show="isShowDetail">
                <ul>
                   <li class="flex"
                       v-for="item in detailList.content">
                       <a :href="'#/' + modulesMap[item.type] + '/' + item.id"
                          :id="item.id" class="flex-2">{{item.title}}</a>
                       <span class="float-right flex-1">{{item.createDate | date}}</span>
                   </li>
                </ul>
                <div class="tag-wrapper">
                    <label class="label"
                           :style="{backgroundColor: curColor}"
                           v-for="tag in detailList.tags">{{tag}}</label>
                </div>
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
                <p>Choojen</p>
                <p>qiujuan.yuan@163.com</p>
            </div>
        </section>
        <p class="desc">好学而不贰。<br/>儿童急走追黄蝶，飞入菜花无处寻。</p>
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
                modules: [],
                modulesMap: {},
                isShowDetail: false,
                detailTitle: "",
                detailList: {},
                curColor: ""
            }
        },
        created(){
            this.getTypes()
        },
        methods: {
            getModuleDetail(item){
                var lists = [],
                        tags = [];
                this.isShowDetail = !this.isShowDetail;
                this.detailTitle = "";
                this.detailList = {};
                this.curColor = item.bgColor;

                if(this.isShowDetail){
                    this.$http.get("/types/" + item.id + ".node").then(function(res){
                        lists = res.data;

                        //循环出标签
                        for(var i = 0; i < lists.length; i++){
                            var tagsArr = lists[i].tags.split(",");

                            for(var j = 0; j < tagsArr.length; j++){
                                if(tags.indexOf(tagsArr[j]) < 0){
                                    tags.push(tagsArr[j])
                                }
                            }
                        }

                        if(tags.length > 5){
                            tags = tags.splice(0, 4)
                        }

                        if(lists.length == 0){
                            tags.push("此模块暂无数据")
                        }

                        setTimeout(function(){
                            this.detailTitle = item;
                            this.detailList = {
                                content: lists,
                                tags: tags
                            };
                        }.bind(this), 300);

                    }.bind(this))
                }
            },
            getTypes(){
                this.$http.get('/types.node').then(function(res) {
                    this.modules = res.data;

                    for(var i = 0; i < this.modules.length; i++){
                        this.modulesMap[this.modules[i].id] = this.modules[i].enName
                    }
                }.bind(this))
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

            button
                i
                    padding: 0!important

        span
            i.fa
                font-size: 1.6rem
                color: #e9967a
                padding: 6px

    .modules
        height: 24rem
        width: 24rem
        margin: $headerH auto 0
        padding-bottom: $headerH

        h4
            display: inline-block
            font: bold 2.1rem/50px "Microsoft YaHei"
            color: #999
            margin-left: 10px
            @include transition((display 1s, font-size 1s))

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
            @include transition((width .5s, height .5s))

            a
                display: inline-block
                width: 50%
                height: 50%
                text-align: center
                color: #fff
                font: bold 2rem/12rem "Microsoft YaHei"
                @include transition((fontSize .5s))
                &:hover
                    cursor: pointer

        .fun.small-modules
            height: 50px
            width: 50px
            display: inline-block
            float: left
            @include transform(360deg)

            a
                font-size: 0
                color: rgba(255, 255, 255, 0)
                font: bold 0rem/0rem "Microsoft YaHei"

        .modules-detail
            padding: $commonGap 0
            line-height: 22px
            @include transition((display .5s))

            ul
                li
                    color: cadetblue
                    a
                        line-height: 24px
                        font-size: 1.4rem
                        text-decoration: none
                        color: cadetblue
                        &:hover
                            text-decoration: underline

            .tag-wrapper
                margin: 20px 0 0
                border-top: 1px solid #cce0e1
                text-align: center
                .label
                    display: inline-block
                    padding: 12px 6px
                    line-height: 1.4rem
                    margin: 0 $commonGap $commonGap $commonGap
                    font-size: .5rem
                    color: white
                    width: 1rem
                    word-wrap: break-word
                    height: auto
                    vertical-align: top
                    margin-top: -7px
                    position: relative
                    cursor: pointer
                    @include clipPath(polygon(0% 25%, 50% 0%, 100% 25%, 100% 100%, 0% 100%))
                    @include animation((swing 3s infinite))
                    @include transformOrigin((50% 1%))
                    @include keyframe(swing)
                        0%
                            @include transform(rotate(-15deg))
                        50%
                            @include transform(rotate(15deg))
                        100%
                            @include transform(rotate(-15deg))
                    &:hover
                        animation-fill-mode: forwards
                        animation-play-state: paused



                    &:before
                        content: "。"
                        position: absolute
                        top: -6px
                        left: 39%
                        color: #dbdfce

    section
        margin: $commonGap 0
        .profile
            width: 5.5rem
            height: 5.5rem
            border-radius: 50%
            background-color: #FF8C00
            text-align: center
            line-height: 5.5rem
            margin-right: $smallGap
            i
                font-size: 3rem
                color: #fff
                vertical-align: middle

        .contact
            font-size: 1.4rem
            p
                margin: .5rem
                color: cadetblue

    .desc
        text-align: center
        line-height: 22px
        font-size: 1.3rem
        color: #b8b6b6
</style>