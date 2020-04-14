<template>
    <div>
        <div v-if="kk==1">
            <Create></Create>
        </div>
        <div v-if="kk==2">
            <Chat></Chat>
        </div>
        <div v-if="kk==3">
            <Profile></Profile>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Msg from './Msg.js'
    import Create from './Create.vue'
    import Chat from './Chat.vue'
    import Profile from './Profile.vue'
    export default{
        data(){
            return {
                kk:3
            }
        },
        components:{
            Create,
            Chat,
            Profile
        },
        mounted:function(){
            var _this = this;
            Msg.$on('val',function(m){
                _this.kk = m;
            })
        }
    }
</script>