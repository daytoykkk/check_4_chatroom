<template>
    <div style="text-align: center;border-right: 2px solid #f5f6fa;">
        <img src="img/logo.png" style="margin-top: 5%;">
        <div class="tubiao">
            <span class="glyphicon glyphicon-edit" @click="menu1"></span><br><br><br>
            <span class="glyphicon glyphicon-comment" @click="menu2"></span><br><br><br>
            <span class="glyphicon glyphicon-user" @click="menu3"></span>
        </div>  
        <span class="glyphicon glyphicon-cog" style="margin-top: 7.5em;text-align:center;"></span>
    </div>
</template>
<<<<<<< HEAD
<style type="text/css" scoped>
=======
<style type="text/css">
>>>>>>> first commit
.tubiao{
    width: 100%;
    margin-top: 12em;
    text-align: center;
}
span{
    font-size: 2.1em;
    color: #babfc4;
    cursor: pointer;
}
span:active{
    color: #3f97ff;
}
</style>

<script type="text/javascript">
    import Msg from './Msg.js'
    export default{
        methods:{
            menu1:function(){
                Msg.$emit("val","1");
            },
            menu2:function(){
                Msg.$emit("val","2");
            },
            menu3:function(){
                Msg.$emit("val","3");
            }
        }
    }
</script>