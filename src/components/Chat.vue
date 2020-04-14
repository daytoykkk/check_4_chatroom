<template>
    <div class="mainChat">
        <div id="chat">
            <Dialog></Dialog>
        </div>
        <div v-if="mm==1" class="popup">
            <Share></Share>
        </div>
        <div v-if="mm==2" class="popup">
            <Xiugai></Xiugai>
        </div>
    </div>
</template>

<style type="text/css" scoped>
.mainChat{
    height: 52em;
    display: flex;
}
#chat{
    width: 100%;
}
.popup{
    width: 25%;
    margin-right: 2px;
}
</style>

<script type="text/javascript">
    import Msg from './Msg.js'
    import Dialog from './Dialog.vue'
    import Share from './Share.vue'
    import Xiugai from './Xiugai.vue'
    export default{
        data(){
            return {
                mm:0
            }
        },
        components:{
            Dialog,
            Share,
            Xiugai
        },
        mounted:function(){
            var _this = this;
            Msg.$on('obj',function(m){
                _this.mm = m;
            }),
            this.$watch('mm',() => {
                 if(this.mm==0){
                     let chat = document.getElementById('chat');
                     chat.style="width:100%";
                 }else{
                     let chat = document.getElementById('chat');
                     chat.style="width:75%";
                 }
            })
        }
        
    }
</script>