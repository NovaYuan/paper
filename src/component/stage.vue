<!--created by Choojen on 2016/12/14.-->

<template lang="html">
    <div class="flex-3 content-container">
        <canvas id="loading"></canvas>
        <!--<div class="book-wrapper-left float-left"></div>-->
        <!--<div class="book-wrapper-right float-left"></div>-->
    </div>
</template>

<script>
    export default {
        mounted(){
            var canvas = document.getElementById('loading'),
                    ctx = canvas.getContext('2d'),
                    el = document.getElementsByClassName("content-container"),
                    count = 50;

            canvas.height = el[0].offsetHeight;
            canvas.width = el[0].offsetWidth;

            ctx.moveTo(100, canvas.height / 2);
            ctx.lineTo(140, canvas.height / 2);

            for(var i = 0; i < count; i++){
                var rand = Math.random(),
                        gap,
                        smallgap = 50,
                        middlegap = -50;

                if(rand > 0.5){
                    gap = rand * smallgap
                }else if(rand < 0.5){
                    gap = rand * middlegap
                }else if(rand.toFixed(1) == 0.5){
                    gap = 0
                }

                if(i < count - 1){
                    ctx.lineTo(140 + i * 10, canvas.height / 2 + gap)
                }else{
                    ctx.lineTo(140 + i * 10, canvas.height / 2)
                }
            }

            ctx.stroke();
        },
        data(){
            return {
                name: "bs"
            }
        }
    }
</script>

<style rel="stylesheet/sass" lang="sass?indentedSyntax">
    @import "../../sass/define"

    .content-container
        padding: 40px $bigGap $smallGap

        #loading
            width: 100%
            height: 100%

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
        transform-style: preserve-3d

    .book-wrapper-left
        background: -webkit-linear-gradient(left, #fff 0%, #f3f2f0 100%)
        background: -moz-linear-gradient(left, #fff 0%, #f3f2f0 100%)
        background: -ms-linear-gradient(left, #fff 0%, #f3f2f0 100%)
        background: linear-gradient(left, #fff 0%, #f3f2f0 100%)
        border-radius: 5px 0 0 5px
</style>