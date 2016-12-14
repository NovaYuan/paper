<!--created by Choojen on 2016/12/13.-->

<template lang="html">
    <div class="flex-1 side">
        <header class="flex row-reverse">
            <span v-if="isAuth">
                <i class="fa fa-envelope-o"></i>
            </span>
        </header>
        <section class="flex justify-center align-center flex-column">
            <div class="profile flex-1">
                <img v-if="profileUrl"/>
                <i class="fa fa-user-o" v-else></i>
            </div>
            <div class="contact">
                <p>名字：Choojen</p>
                <p>Email：qiujuan.yuan@163.com</p>
            </div>
        </section>
        <div class="fun flex">
            <a v-for="item in games" class="flex-1">
                {{item.name}}
            </a>
        </div>
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
                games: [
                    {
                        name: "五子棋",
                        enName: "gobang"
                    },
                    {
                        name: "俄罗斯方块",
                        enName: "elous"
                    },
                    {
                        name: "神仙道",
                        enName: "shenxiandao"
                    },
                    {
                        name: "拼图",
                        enName: "pintu"
                    }
                ]
            }
        }
    }
</script>

<style rel="stylesheet/sass" lang="sass?indentedSyntax">
    @import "../../sass/define"
    $headerH: 40px

    .side
        padding: $commonGap

    header
        height: $headerH
        line-height: $headerH
        box-sizing: border-box
        span
            i.fa
                font-size: 1.6rem

    section
        .profile
            width: 100px
            height: 100px
            border-radius: 50%
            background-color: #eeeeee
            text-align: center
            line-height: 100px
            i
                font-size: 8rem
                color: #fff
                vertical-align: middle

        .contact
            font-size: 1.4rem

</style>