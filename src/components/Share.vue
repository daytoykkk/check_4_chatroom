<template>
  <div class="mainShare">
    <div id="close">
      <img src="../assets/back.png" @click="close" />
    </div>

    <div id="shareIntro">
      <div id="shareGroup">
        <div id="shareTou">
          <img id="group-tx" :src="grouptx" />
        </div>
        <div style="margin-left: 5%;">
          <h3>{{groupname}}</h3>
          <el-button type="text" style="color:#90919c" @click="centerDialogVisible = true">
            分享群聊
            <img src="../assets/link.png" style="width:1em;height:1em;" />
          </el-button>
          <el-dialog title="分享群聊" :visible.sync="centerDialogVisible" width="30%" center>
            <a :href="groupurl">点击进入房间:{{roomid}}</a>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="centerDialogVisible = false">关 闭</el-button>
            </span>
          </el-dialog>
        </div>
      </div>

      <div id="shuoming">
        <center>{{groupdes}}</center>
      </div>
    </div>

    <div id="fenxiang">
      <br />
      <div id="fen">
        <br />
        <p>
          新浪微博
          <a href="#">
            <img src="../assets/weibo.png" />
          </a>
        </p>
        <hr />
        <p>
          微信
          <a href="#">
            <img src="../assets/wechat.png" />
          </a>
        </p>
        <hr />
        <p>
          QQ
          <a href="#">
            <img src="../assets/QQ.png" />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style type="text/css">
.mainShare {
  background-color: #ffffff;
  height: 52em;
}
#close {
  height: 8%;
  border-bottom: 1px solid rgb(247, 247, 247);
}
#close img {
  height: 45%;
  margin-top: 5%;
  cursor: pointer;
}
#share {
  width: 25%;
  background-color: rgb(255, 255, 255);
}
#shareIntro {
  height: 35%;
}
#shareIntro a {
  color: #94959e;
}
#shareGroup {
  height: 40%;
  display: flex;
}
#shareGroup h3 {
  font-size: 1.5em;
}
#shareTou {
  width: 25%;
}
#shareTou img {
  width: 4em;
  height: 4em;
  margin-left: 10%;
  margin-top: 1em;
  border: 1px solid pink;
  border-radius: 50%;
}
#shuoming {
  height: 60%;
}

#fenxiang {
  height: 57%;
  background-color: rgb(245, 246, 250);
}
#fen {
  width: 90%;
  height: 45%;
  background-color: rgb(255, 255, 255);
  border-radius: 3%;
  margin-left: 5%;
}
#fen hr {
  width: 80%;
  margin-left: 10%;
}
#fen p {
  color: rgb(169, 175, 181);
  margin-left: 10%;
}
#fen a {
  float: right;
  margin-right: 10%;
}
</style>

<script type="text/javascript">
import Msg from "./Msg.js";
export default {
  data() {
    return {
      grouptx: "",
      centerDialogVisible: false,
      groupurl:"",
      roomid:"",
      groupname:"",
  groupdes:""
    };
  },
  mounted() {
    this.groupurl=localStorage.getItem("url");
    this.roomid=localStorage.getItem("roomid");
    this.loadMsg();
  },
  methods: {
    close: function() {
      Msg.$emit("obj", "0");
    }, 
    loadMsg() {
      this.$axios
        .get("/api/room/info/",{
          params:{roomid:this.roomid}
        })
        .then(res=>{
          let data=res.data.data;
          this.groupname=data.name;
          this.groupdes=data.detail;
          this.grouptx="http://39.106.119.191/uploads/rooms/"+data.icon;
        })
    },
  }
};
</script>