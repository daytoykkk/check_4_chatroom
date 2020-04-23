<template>
  <i style="text-align: center;border-right: 2px solid #f5f6fa;">
    <center>
      <img src="img/logo.png" style="margin-top: 5%;" />
    </center>
    <div class="tubiao">
      <i id="one" class="el-icon-edit-outline" :class="{active:isone}" @click="menu1"></i>
      <br />
      <br />
      <br />
      <i id="two" class="el-icon-chat-square" :class="{active:istwo}" @click="menu2"></i>
      <br />
      <br />
      <br />
      <i id="three" class="el-icon-user" :class="{active:isthree}" @click="menu3"></i>
    </div>
    <center>
      <el-button class="show" type="text" @click="table = true">
        <i
          class="el-icon-setting"
          @click="getList()"
          style="font-size:2.3em;margin-top: 6.5em;color: #babfc4;"
        ></i>
      </el-button>
    </center>

    <el-drawer id="list" title="聊天列表" :visible.sync="table" direction="ltr" size="20%">
      <div class="list-box" v-for="(list,index) in lists" :key="index" :id="list.roomid">
        <img
          :src="list.icon"
          data-src="holder.js/64*64"
          data-holder-rendered="true"
          style="width:3em;height:3em;margin-top:0.5em;border-radius:50%;border:1px solid pink;"
        />
        <div class="list-msg-box" @click="toRoom(list)">
          <p>
            {{list.name}}
          </p>
          <span>{{list.detail}}</span>
        </div>
      </div>
    </el-drawer>
  </i>
</template>
<style type="text/css" scoped>
.tubiao {
  width: 100%;
  margin-top: 13em;
  text-align: center;
}
.tubiao i {
  font-size: 2.3em;
  color: #babfc4;
  cursor: pointer;
}
.active {
  color: #3f97ff;
}
.list-box{
  display: flex;
}
.list-msg-box p {
  font-style: normal;
  font-size: 1.2em;
  margin-left: -1em;
  cursor: pointer;
}
.list-msg-box span {
  font-style: normal;
  color: #babfc4;
   margin-left: 1em;
   cursor: pointer;
}
</style>

<script type="text/javascript">
import Msg from "./Msg.js";
export default {
  data() {
    return {
      isone: false,
      istwo: false,
      isthree: true,
      table: false,
      lists: []
    };
  },
  methods: {
    menu1: function() {
      Msg.$emit("val", "1");
      this.isone = true;
      this.istwo = false;
      this.isthree = false;
    },
    menu2: function() {
      Msg.$emit("val", "2");
      this.isone = false;
      this.istwo = true;
      this.isthree = false;
    },
    menu3: function() {
      Msg.$emit("val", "3");
      this.isone = false;
      this.istwo = false;
      this.isthree = true;
    },
    getList() {
      let _this = this;
      let _token = localStorage.getItem("token");
      _token = _token.replace('"', "").replace('"', "");
      this.$axios
        .get("/api/room/", { params: { token: _token } })
        .then(function(rsp) {
          let data = JSON.parse(JSON.stringify(rsp.data)).data;
          _this.lists = data;
          for (let i = 0, len = data.length; i < len; i++) {
            _this.lists[i].icon =
              "http://39.106.119.191/uploads/rooms/" + _this.lists[i].icon;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toRoom(list){
      localStorage.setItem("roomid",list.roomid);
      document.getElementById("two").click();
      Msg.$emit("enter",1);
    }
  }
};
</script>