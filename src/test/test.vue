<!--created by Choojen on 2016/12/13.-->

<template lang="html">
    <div>
        <div class="message">
            {{ message }}
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                message: 'Helo, Vue.js 2.0'
            }
        }
    }
</script>

<style lang="css">
    .message {
        color: pink;
        font-size: 1.4em;
    }
</style>