<!--created by Choojen on 2016/12/14.-->
<template lang="html">
    <div class="flex-3 content-container">
        <div class="loading-container" v-if="isLoading">
            <canvas id="loading"></canvas>
            <canvas id="loading-bar" v-on:hover="drawHeart($event)"></canvas>
        </div>
        <div class="book-wrapper-left float-left">
            <div class="article-detail">
                <h3 class="h3">{{detail.title}}</h3>
                <p class="create-info flex">
                    <small class="creator flex-1">作者: {{detail.creator}}</small>
                    <small class="creator flex-1">创建时间: {{detail.createDate | date}}</small>
                </p>
                <div class="abstract">{{detail.abstract}}</div>
                <div class="content">
                    {{detail.content}}
                    <p class="text-center" v-if="emptyContent">{{emptyContent}}</p>
                </div>
            </div>
        </div>
        <div class="book-wrapper-right float-left"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                name: "bs",
                heartbeatPath: [],
                isLoading: true,
                emptyContent: "",
                detail: {}
            }
        },
        created(){
            this.fetchData()
        },
        mounted(){
            this.strokeHeartbeatLine();
            this.strokeAurora();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            strokeHeartbeatLine(){
                var canvas = document.getElementById('loading'),
                        ctx = canvas.getContext('2d'),
                        el = document.getElementsByClassName("content-container");

                canvas.height = el[0].offsetHeight;
                canvas.width = el[0].offsetWidth;

                ctx.strokeStyle = "rgb(255, 182, 193)";
                ctx.moveTo(100, canvas.height / 2);
                ctx.lineTo(140, canvas.height / 2);
                this.heartbeatPath.push([100, canvas.height / 2], [140, canvas.height / 2]);

                var last = 145;
                for(var i = 0; i < 150; i++){
                    var gap = Math.random().toFixed(1) * 100,
                            path = [],
                            center = canvas.height / 2;

                    if(i % 8 == 0){
                        ctx.lineTo(last, center - gap);
                        path = [last, center - gap]
                    }else if(i % 5 == 0){
                        ctx.lineTo(last, center + gap);
                        path = [last, center + gap]
                    }else{
                        ctx.lineTo(last, center);
                        path = [last, center]
                    }

                    this.heartbeatPath.push(path);

                    if(last + i * 10 > last){
                        if(i % 8 == 0){
                            last = last + 10
                        }else if(i % 5 == 0){
                            last = last
                        }else{
                            last = last + 5
                        }
                    }
                }
                ctx.fillStyle = "rgb(255, 182, 193)";
                ctx.font = "1.4rem Arial";
                ctx.fillText("小服正在拿数据，请稍等...", last / 2, center - 105);
                ctx.stroke();
            },
            strokeAurora(){
                var canvas = document.getElementById('loading-bar'),
                        ctx = canvas.getContext('2d'),
                        paths = this.heartbeatPath,
                        count = 0;

                canvas.width = document.getElementById('loading').width;
                canvas.height = document.getElementById('loading').height;

                var strokeBeam = function(start, end){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(196, 43, 110, .6)";
                    ctx.fillStyle = "rgba(196, 43, 110, .6)";
                    ctx.lineWidth = 2;
                    ctx.shadowColor = "red";
                    ctx.shadowBlur = 10;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.moveTo(paths[start][0], paths[start][1]);
                    ctx.lineTo(paths[end][0], paths[end][1]);
                    ctx.arc(paths[end][0], paths[end][1], .5, 0, Math.PI * 2, true);
                    ctx.stroke();
                };
                strokeBeam(0, 1);

                var followPath = setInterval(function(){
                    if(count >= paths.length - 1){
                        count = 1;
                    }
                    strokeBeam(count, count + 1);
                    count++;
                }, 30);
            },
            drawHeart(e){
                console.log(e)
            },
            fetchData(){
                var params = this.$route.params;

                this.$http.get('/'+ params.service +'/'+ params.id +'.node').then(function(res){
                    this.isLoading = false;
                    this.detail = res.data[0];

                    if(!this.detail.content){
                        this.emptyContent = "作者去偷懒了..."
                    }else{
                        this.emptyContent = ""
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/sass" lang="sass?indentedSyntax">
    @import "../../sass/define"

    .content-container
        padding: 40px $bigGap $smallGap
        -webkit-perspective: 500
        perspective: 500

        #loading
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            z-index: 999

        #loading-bar
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            z-index: 999

    .book-wrapper-left,
    .book-wrapper-right
        height: 100%
        background-color: #eeeeee
        box-sizing: border-box
        width: 50%
        background: -webkit-linear-gradient(left, #f3f2f0 0%, #fff 100%)
        background: -moz-linear-gradient(left, #f3f2f0 0%, #fff 100%)
        background: -ms-linear-gradient(left, #f3f2f0 0%, #fff 100%)
        background: linear-gradient(left, #f3f2f0 0%, #fff 100%)
        box-shadow: inset 0 -1px 2px rgba(50, 50, 50, 0.1), inset -1px 0 1px rgba(150, 150, 150, 0.2)
        border-radius: 0 5px 5px 0
        box-shadow: 0 7px 8px #ddd
        position: relative

        &:after,
        &:before
            content: " "
            border: 1px solid #e8e8e8
            width: 100%
            height: 100%
            position: absolute
            top: 0
            z-index: -6
            border-top-right-radius: 5px
            border-bottom-right-radius: 5px

        &:after
            width: 100.5%
            height: 100.5%

    .book-wrapper-left
        background: -webkit-linear-gradient(left, #fff 0%, #f3f2f0 100%)
        background: -moz-linear-gradient(left, #fff 0%, #f3f2f0 100%)
        background: -ms-linear-gradient(left, #fff 0%, #f3f2f0 100%)
        background: linear-gradient(left, #fff 0%, #f3f2f0 100%)
        border-radius: 5px 0 0 5px

    .article-detail
        padding: $smallGap $commonGap

        h3
            height: 50px
            line-height: 50px
            text-align: center
            font-size: 1.6rem
            color: #666

        .create-info
            margin: 0
            color: gray
            padding: $smallGap 0
            border-bottom: 1px dotted #eee
            text-align: center

        .abstract,
        .content
            line-height: 24px
            color: darkorange
            text-indent: 2em
            padding: $smallGap 0 0

        .abstract
            text-align: right

        .content
            font-size: 1.4rem
            color: gray

</style>