<template>
    <div class="mainDialog">
        <!--导航栏-->
            <div id="daohang">
                <div id="daoSelf">
                   <img src="img/logo.png">
                   <div style="margin-left: 1em;">
                    <h5>Name</h5>
                    <p>简介</p>
                   </div>
                </div>

                <a href="#" @click="isSearch" id="daoa" title="搜索"><span class="fa fa-search"></span></a>
                <a href="#" @click="show1" title="分享"><span class="fa fa-user-plus"></span></a>
               
                <li class="dropdown" style="list-style-type:none;position:relative;">
				    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
				    	<span class="fa fa-ellipsis-v" title="更多"></span>
				    </a>
				    <ul class="dropdown-menu" id="daohangUl">
				        <li @click="show2">Mute<span class="fa fa-sliders" style="transform:rotate(-90deg);"></span></li>
				        <li>Delet<span class="fa fa-trash-o"></span></li>
				    </ul>
			    </li>
            </div>
            
            <!--对话框-->
            <div id="chatShow" ref="chatShow">
                <!--搜索框-->
                <div v-if="isShow==1" style="width:80%;margin-left:10%;margin-top:2em;">
                    <div class="input-group"  style="display: flex;">
                        <input type="text" class="form-control" placeholder="Search for message or users">
                        <input type="button" class="search">   
                    </div>
                </div>

                
                    <header>聊天室人数:{{count}}</header>
                    <div
                    class="msg"
                    v-for="(i,index) in list"
                    :key="index"
                    >
                        <div class="user-msg">
                            <span
                                :style="i.username == userId?' float:right;' : ''"
                                :class="i.username == userId? 'right':'left'"
                            >
                                {{i.content}}
                            </span>
                        </div>

                    </div>
                
                
            </div>

            <!--发送框-->
            <div id="chatSend">
                <div id="fasong">
                   <textarea ref="sendMsg" v-model="contentText" @keyup.enter="sendText()" cols="140" rows="4" placeholder="Type your message..."></textarea>
                </div>
                <a href="#"><span class="fa fa-smile-o"></span></a>
                <a href="#" @click="getData()"><span class="fa fa-paperclip"></span></a>
                <div id="senda" @click="sendText()"><center><a href="#"><span class="fa fa-send-o"></span></a></center></div> 
            </div>
    </div>
</template>

<style type="text/css" scoped>
.mainDialog{
    height: 52em;
    background-color: #ffffff;
}
p{
    cursor: pointer;
}
#daohang{
    height: 8%;
    border-bottom:1px solid rgb(247, 247, 247);
    display: flex;
}
#daohang span{
    font-size: 1.5em;
    margin-left: 1.5em;
    margin-top: 0.8em;
}
#daohang a{
    color: #babfc4;
}
#daohangUl{
    position: absolute;
    left: -4em;
    border-radius: 15px;
}
#daohangUl li{
    color: #8f909b;
    font-size: 1.2em;
    padding-left: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    cursor: pointer;
}
#daohangUl span{
    font-size: 1em;
    margin-left: 4em;
}
#daoSelf{
    width: 85%;
    display: flex;
}
#daoSelf p{
    font-size: 0.8em;
    color: rgb(195, 199, 203);
}
#daoSelf img{
    height: 3em;
    width: 3em;
    border: 1px solid pink;
    border-radius: 50%;
    margin-top: 0.3em;
    margin-left: 1.5%;
}
#chatShow{
    border-bottom:1px solid rgb(247, 247, 247);
    height: 72%;
    overflow-y: auto;
}
#chatSend{
    height: 20%;
    display: flex;
}
#chatSend a{
    font-size: 1.8em;
    margin-left: 2%;
    margin-top: 4%;
}
#senda{
    width: 3em;
    height: 3em;
    text-align: center;
    background-color: rgb(1, 118, 255);
    border-radius: 50%;
    margin-left: 2%;
    margin-top: 4%;
}
#senda span{
    color: white;
    font-size: 0.7em;
}
#fasong{
    width: 85%;
}
#fasong textarea{
    font-size: 1.5em;
    outline:none;
    resize:none;
    border: none;
}

.left{
    background:white;
    animation: toLeft 0.5s ease both 1;
}
.right{
    background: #53a8ff;
    color: white;
    animation: toright 0.5s ease both 1;
}
</style>


<script type="text/javascript">
    import Msg from './Msg.js'
    export default{
        data() {
            return {
                isShow: -1,
                ws: null,
                count: 0,
                userId: null,
                list: [],
                contentText: ""
            };
        },
        created(){
            this.getUserID();
        },
        mounted:function() {
            this.initWebSocket();
        },
        methods:{
            show1:function(){
                Msg.$emit("obj","1");
            },
            show2:function(){
                Msg.$emit("obj","2");
            },
            show0:function(){
                Msg.$emit("obj","0");
            },
            isSearch:function(){
                this.isShow = -this.isShow;
            },
            scrollBottom:function() {
                let el = this.$refs["chatShow"];
                el.scrollTop = el.scrollHeight;
            },
            getUserID:function(){
                let time = new Date().getTime();
                this.userId =time;
            },
            sendText:function() {
                let _this = this;
                _this.$refs["sendMsg"].focus();
                if(!_this.contentText) {
                    return;
                }
                let params = {
                    username:_this.userId,
                    msg: _this.contentText,
                    type:1,
                    roomid:roomid
                };
                _this.ws.send(JSON.stringify(params));
                _this.list.push({
                    username:_this.userId,
                    msg: _this.contentText,
                    type:1,
                    roomid:roomid
                })
                _this.contentText = "";
                setTimeout(() => {
                    _this.scrollBottom();
                },500);
            },
            initWebSocket:function() {
                let _this = this;
                if(window.WebSocket) {
                    let ws = new WebSocket("ws://39.106.119.191");
                    _this.ws = ws;
                    ws.onopen = function(e) {
                        console.log("服务器连接成功");
                    };
                    ws.onclose = function(e) {
                        console.log("服务器连接关闭");
                    };
                    ws.onerror = function() {
                        console.log("服务器连接出错");
                    };
                    ws.onmessage = function(e) {
                        let resData = JSON.parse(e.data);
                        console.log(resData);
                        _this.list.push({
                            username: resData.username,
                            msg: resData.msg,
                            type:resData.type,
                            roomid:resData.roomid
                        })
                    }
                }
            },
            getData(){
                let _this = this;
                alert("aa");
                _this.$http.get('http://39.106.119.191').then(function(res) {
                    console.log(res)
                    // 响应成功回调
                },function(res) {
                    console.log(res)
                    // 响应错误回调
                });
            },
        }
    }
</script>
