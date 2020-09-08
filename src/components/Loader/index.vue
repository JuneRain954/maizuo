<template>
    <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</template>

<script>
export default {
    name: 'Loader'
}
</script>

<style lang="scss" scoped>
    .loader{
        position: absolute;
        left: 40%;
        bottom: -2px;
        margin-left: 10%;
        transform: translate3d(-50%,-50%,0);
    }

    .dot{
        width: 16px;
        height: 16px;
        background: #3ac;
        border-radius: 100%;
        display: inline-block;
        animation: slide 1s infinite;
    }
    .dot:nth-child(1){
        animation-delay: 0.1s;
        background-color: #32aacc;
    }
    .dot:nth-child(2){
        animation-delay: 0.2s;
        background: #6dafcf;
    }
    .dot:nth-child(3){
        animation-delay: 0.3s;
        background: #a5b6d3;
    }
    .dot:nth-child(4){
        animation-delay: 0.4s;
        background: #c8abcc;
    }
    .dot:nth-child(5){
        animation-delay: 0.5s;
        background: #fbbfd8;
    }

@keyframes slide{
        0%{
            transform: scale(1);
        }
        50%{
            opacity: .3;
            transform: scale(2);
        }
        100%{
            transform: scale(1);
        }
    }
</style>
