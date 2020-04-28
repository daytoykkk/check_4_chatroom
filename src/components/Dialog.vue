<template>
  <div class="mainDialog">
    <!--导航栏-->
    <div id="daohang">
      <div id="daoSelf">
        <img :src="grouptx" />
        <div style="margin-left: 1em;">
          <h5>
            {{groupname}}
            <p style="color:#8e8e8e;float:right;font-size:1em;margin-left:0.5em;">聊天室人数:{{count}}</p>
          </h5>
          <p>{{groupdes}}</p>
        </div>
      </div>

      <a href="#" @click="isSearch" id="daoa" title="搜索">
        <img
          src="../assets/search.png"
          title="搜索"
          style="margin-left: 1.5em;margin-top:1em;width:1.8em;height:1.8em;"
        />
      </a>
      <a href="#" @click="show1" title="分享">
        <img
          src="../assets/share.png"
          title="分享"
          style="margin-left: 1.5em;margin-top:1em;width:1.8em;height:1.8em;"
        />
      </a>

      <li class="dropdown" style="list-style-type:none;position:relative;">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <img
            src="../assets/more.png"
            title="更多"
            style="margin-left: 1.5em;margin-top:1em;width:1.8em;height:1.8em;"
          />
        </a>
        <ul class="dropdown-menu" id="daohangUl">
          <li @click="show2">
            Mute
            <span class="el-icon-s-operation" style="transform:rotate(-90deg);"></span>
          </li>
          <li title="退出房间" @click="open()">
            <el-button type="text" style="color:#8f909b;">Delete</el-button>
            <span class="el-icon-delete"></span>
          </li>
        </ul>
      </li>
    </div>

    <!--对话框-->
    <div id="chatShow" ref="chatShow">
      <!--搜索框-->
      <div v-if="isShow==1" style="width:80%;margin-left:10%;margin-top:2em;">
        <div class="input-group" style="display: flex;">
          <input
            style="width:80%;"
            type="text"
            class="form-control"
            placeholder="Search for message"
            v-model="info"
          />
          <input style="width:4%;" type="button" class="search" @click="searchMsg()" />
        </div>
      </div>

      <div class="msg" v-for="(i,index) in list" :key="index">
        <!--上下线通知-->
        <div class="updown" v-if="i.user_id==-1">
          <center>
            <p v-if="i.is_online==1">{{i.username}}上线了</p>
            <p v-else>{{i.username}}下线了</p>
          </center>
        </div>

        <!--左边-->
        <div class="user-msg-left" v-else-if="i.user_id!=userId">
          <div class="left-tx">
            <img :src="i.user_icon" />
            <p>{{i.time.substr(11,5)}}</p>
          </div>
          <div class="left-msg" v-if="i.type==1">
            <p style="margin-bottom:-0.1em;">{{i.from_user}}</p>
            <div class="lll">{{i.msg}}</div>
          </div>
          <div v-else-if="i.type==2">
            <p style="margin-bottom:-0.1em;margin-left:0.9em;">{{i.from_user}}</p>
            <div class="left-img">
              <img :src="i.msg" />
            </div>
          </div>
        </div>

        <!--右边-->
        <div class="user-msg-right" v-else>
          <div class="right-msg" v-if="i.type==1">
            <p style="margin-bottom:-0.1em;float:right;margin-right:1em;">{{i.from_user}}</p>
            <br />
            <div class="rrr">{{i.msg}}</div>
          </div>

          <div v-else-if="i.type==2">
            <p style="margin-bottom:-0.1em;float:right;margin-right:0.8em;">{{i.from_user}}</p>
            <br />
            <div class="right-img">
              <img :src="i.msg" />
            </div>
          </div>
          <div class="left-tx">
            <img :src="i.user_icon" />
            <p>{{i.time.substr(11,5)}}</p>
          </div>
        </div>
      </div>
    </div>

    <!--发送框-->
    <div id="chatSend">
      <div id="fasong">
        <!--预览框-->
        <input type="file" style="display:none;" id="saveImage" name="myphoto" />
        <div class="viewPhoto" v-if="!isPng">
          <img
            :src="imageSave"
            id="portrait"
            style="height:9em;width:auto;cursor:pointer;"
            title="点击删除"
            @click="shanchu()"
          />
        </div>
        <textarea
          ref="sendMsg"
          v-model="contentText"
          @keyup.enter="sendText()"
          cols="140"
          rows="4"
          placeholder="Type your message..."
          v-if="isPng"
        ></textarea>
      </div>
      <a href="#">
        <img src="../assets/biaoqing.png" style="margin-top:0.5em;width:1.2em;height:1.2em;" />
      </a>
      <a href="#" @click="moni()">
        <img src="../assets/link1.png" style="margin-top:0.5em;width:1.2em;height:1.2em;" />
      </a>

      <a href="#" @click="sendText();imgSubmit()">
        <img src="../assets/send.png" style="margin-top:0.5em;width:1.2em;height:1.2em;" />
      </a>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.updown {
  margin-top: 1.5em;
}
.updown p {
  width: 20%;
  background: hsl(212, 21%, 88%);
  color: white;
  border-radius: 2em;
  padding-top: 2px;
  padding-bottom: 2px;
}
.left-tx {
  align-content: center;
}
.left-tx p {
  color: #babfc4;
  font-size: 1em;
}
.left-tx img {
  height: 3em;
  width: 3em;
  border-radius: 50%;
}
.left-msg {
  padding: 0.5em;
}
.lll {
  font-size: 1.2em;
  background-color: rgb(238, 238, 238);
  border: none;
  resize: none;
  border-radius: 0.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 1.2em;
  max-width: 20em;
}
.left-img {
  background-color: rgb(238, 238, 238);
  border-radius: 0.5em;
  padding: 0.5em;
  margin-left: 0.7em;
}
.left-img img {
  height: 8em;
  width: auto;
}
.right-msg {
  padding: 0.5em;
}
.rrr {
  font-size: 1.2em;
  background-color: #53a8ff;
  border: none;
  resize: none;
  border-radius: 0.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 1.2em;
  max-width: 20em;
}
.right-img {
  background-color: #53a8ff;
  border-radius: 0.5em;
  padding: 0.5em;
  margin-right: 0.7em;
}
.right-img img {
  height: 8em;
  width: auto;
}
.user-msg-left {
  display: flex;
  margin-top: 1.5em;
}
.user-msg-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5em;
}
.mainDialog {
  height: 52em;
  background-color: #ffffff;
}

#daohang {
  height: 8%;
  border-bottom: 1px solid rgb(247, 247, 247);
  display: flex;
}
#daohang span {
  font-size: 1.5em;
  margin-left: 1.5em;
  margin-top: 0.8em;
}
#daohang a {
  color: #babfc4;
}
#daohangUl {
  position: absolute;
  left: -4em;
  border-radius: 15px;
}
#daohangUl li {
  color: #8f909b;
  font-size: 1.2em;
  padding-left: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  cursor: pointer;
}
#daohangUl span {
  font-size: 1em;
  margin-left: 4em;
}
.input-group input[type="text"] {
  background-color: #edeef6;
  border: none;
}
.search {
  width: 3em;
  border: none;
  border-radius: 5%;
  background: url("/img/search.png") no-repeat scroll center transparent;
}
#proOne {
  height: 25%;
  background-color: rgb(255, 255, 255);
  border-radius: 3%;
}
#daoSelf {
  width: 85%;
  display: flex;
}
#daoSelf p {
  font-size: 0.8em;
  color: rgb(195, 199, 203);
}
#daoSelf img {
  height: 3em;
  width: 3em;
  border: 1px solid pink;
  border-radius: 50%;
  margin-top: 0.3em;
  margin-left: 1.5%;
}
#chatShow {
  border-bottom: 1px solid rgb(247, 247, 247);
  height: 72%;
  overflow-y: auto;
}
#chatSend {
  height: 20%;
  display: flex;
}
#chatSend a {
  font-size: 1.8em;
  margin-left: 2%;
  margin-top: 4%;
}

#fasong {
  width: 85%;
}
#fasong textarea {
  font-size: 1.5em;
  outline: none;
  resize: none;
  border: none;
}
</style>


<script type="text/javascript">
import Msg from "./Msg.js";
export default {
  inject: ["reload"],
  data() {
    return {
      isShow: -1,
      isPng: true, //预览
      imageSave: "",
      ws: null,
      count: 0,
      userId: null,
      list: [],
      contentText: "",
      roomid: "",
      token: "",
      grouptx: "",
      groupname: "",
      groupdes: "",
      isPhoto: false, //是否要发图片
      info: ""
    };
  },
  mounted() {
    let _this = this;
    this.getRandTandU();
    this.getMsg();
    this.initWebSocket();
    this.yulan();
  },
  methods: {
    show1: function() {
      Msg.$emit("obj", "1");
    },
    show2: function() {
      Msg.$emit("obj", "2");
    },
    show0: function() {
      Msg.$emit("obj", "0");
    },
    isSearch: function() {
      let _this = this;
      this.isShow = -this.isShow;
      if (this.isShow == -1) {
        _this.$axios
          .get("/api/msg/", {
            params: { token: _this.token, roomid: _this.roomid }
          })
          .then(res => {
            _this.list = res.data.data;
            for (let i = 0, len = _this.list.length; i < len; i++) {
              _this.list[i].user_icon =
                "http://39.106.119.191/uploads/usericons/" +
                _this.list[i].user_icon;
            }
          })
          .catch(error => {
            console.log(error);
          });
        setTimeout(() => {
        _this.scrollBottom();
      }, 100);
      } else {
        let el = this.$refs["chatShow"];
        el.scrollTop = 0;
      }
    },
    scrollBottom: function() {
      let el = this.$refs["chatShow"];
      el.scrollTop = el.scrollHeight;
    },
    sendText: function() {
      let _this = this;
      if (_this.isPhoto) {
        return;
      }
      if (!_this.contentText || _this.contentText == "\n") {
        alert("不能发空消息！");
        return;
      }
      _this.$refs["sendMsg"].focus();
      let params = {
        msg: _this.contentText,
        type: 1,
        roomid: _this.roomid
      };
      _this.ws.send(JSON.stringify(params));
      _this.contentText = "";
      console.log(params);
      setTimeout(() => {
        _this.scrollBottom();
      }, 100);
    },
    initWebSocket: function() {
      let _this = this;
      var ws = new WebSocket(
        "ws://39.106.119.191/api/ws/" + "?token=" + this.token
      );
      _this.ws = ws;

      ws.onopen = function(e) {
        console.log("服务器连接成功");
      };
      window.onbeforeunload = function(event) {
        alert("您确定离开该网页吗？");
        console.log("关闭WebSocket连接！");
        let send_msg = {
          msg: this.contentText,
          type: 0,
          is_online: 0
        };
        _this.contentText = "";
        ws.send(JSON.stringify(send_msg));
      };
      ws.onerror = function() {
        this.reload();
      };
      ws.onmessage = function(e) {
        let res = eval("(" + e.data + ")");

        if (res.type == 0 && res.roomid == _this.roomid) {
          _this.count = res.num;
          _this.list.push({
            user_id: -1,
            username: res.username,
            is_online: res.is_online
          });
        } else if (res.type != 0) {
          _this.list.push({
            user_icon:
              "http://39.106.119.191/uploads/usericons/" + res.user_icon,
            type: res.type,
            msg: res.msg,
            time: res.time,
            user_id: res.user_id,
            from_user: res.from_user,
            roomid: res.roomid
          });
        }
        setTimeout(() => {
          _this.scrollBottom();
        }, 100);
      };
    },
    getRandTandU() {
      let _this = this;
      _this.userId = localStorage.getItem("id");
      _this.roomid = localStorage.getItem("roomid");
      _this.token = localStorage.getItem("token");
      _this.token = _this.token.replace('"', "").replace('"', "");
    },
    getMsg() {
      this.$axios
        .get("/api/msg/", {
          params: { token: this.token, roomid: this.roomid }
        })
        .then(res => {
          this.list = res.data.data;
          for (let i = 0, len = this.list.length; i < len; i++) {
            this.list[i].user_icon =
              "http://39.106.119.191/uploads/usericons/" +
              this.list[i].user_icon;
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.$axios
        .get("/api/room/info/", {
          params: { roomid: this.roomid }
        })
        .then(res => {
          let data = res.data.data;
          this.groupname = data.name;
          this.groupdes = data.detail;
          this.grouptx = "http://39.106.119.191/uploads/rooms/" + data.icon;
          localStorage.setItem("grouptx", this.grouptx);
          localStorage.setItem("url", data.url);
        });
      setTimeout(() => {
        this.scrollBottom();
      }, 500);
    },
    open() {
      //退出房间
      this.$confirm("是否退出房间", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _token = localStorage.getItem("token");
          _token = _token.replace('"', "").replace('"', "");
          this.$axios
            .delete("/api/room/", {
              params: { token: _token, roomid: this.roomid }
            })
            .then(res => {
              this.reload();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    moni() {
      document.getElementById("saveImage").click();
    },
    yulan() {
      let _this = this;
      document.getElementById("saveImage").onchange = function() {
        let imgFile = this.files[0];
        if (imgFile) {
          _this.isPng = false;
          _this.isPhoto = true;
        }
        let fr = new FileReader();
        fr.onload = function() {
          document.getElementById("portrait").src = fr.result;
        };
        fr.readAsDataURL(imgFile);
      };
    },
    imgSubmit() {
      let _this = this;
      if (_this.isPhoto == false) {
        return;
      }
      let _token = localStorage.getItem("token");
      _token = _token.replace('"', "").replace('"', "");

      let x = document.getElementById("saveImage").files[0];
      let icon = new FormData();
      icon.append("picture", x, x.name);
      icon.append("token", _token);
      icon.append("roomid", this.roomid);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      this.$axios
        .post("/api/msg/picture/", icon, config)
        .then(function(res) {
          let file = document.getElementById("saveImage");
          file.value = "";
          _this.isPng = true;
          _this.isPhoto = false;
        })
        .catch(function(error) {
          console.log(error);
          _this.$notify({
            type: "warning",
            message: "上传失败!",
            offset: 160
          });
        });
      setTimeout(() => {
        _this.scrollBottom();
      }, 500);
    },
    shanchu() {
      let file = document.getElementById("saveImage");
      file.value = "";
      this.isPng = true;
      _this.isPhoto = false;
    },
    searchMsg() {
      //搜索消息
      let _this = this;
      let params = new FormData();
      this.list = [];

      _this.$axios
        .get("/api/room/search/", {
          params: {
            token: _this.token,
            roomid: _this.roomid,
            search_type: 1,
            search_info: _this.info
          }
        })
        .then(res => {
          this.list = res.data.data;
          for (let i = 0, len = this.list.length; i < len; i++) {
            this.list[i].user_icon =
              "http://39.106.119.191/uploads/usericons/" +
              this.list[i].user_icon;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
