<template>
    <div class="main">
        <!--导航栏-->
        <div class="left">
            <Left></Left>
        </div>

        <!--右侧-->
        <div class="right">
            <Right></Right>
        </div>
    </div>
</template>
<style type="text/css">
*{
    padding: 0;
    margin: 0;
}
.main{
    width: 100%;
    height: 52em;
    background-color: #a59e9e;
    display: flex;
    justify-content: center;
}
.left{
    width: 6%;
    background-color: rgb(255, 255, 255);
}
.right{
    width: 94%;
}

</style>

<script type="test/css">
    import Left from '../components/Left.vue'
    import Right from '../components/Right.vue'
    export default{
        components:{
            Left,
            Right
        }
}

</script>