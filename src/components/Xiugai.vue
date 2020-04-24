<template>
  <div class="mainXiugai">
    <div id="close">
      <img src="img/back.png" @click="close" />
    </div>
    <!--个人简介-->
    <div id="selfInt">
      <br />
      <center>
        <div id="touxiang">
          <img :src="grouptx" style="width:4em;height:4em;border-radius:50%;" />
        </div>
      </center>
      <center>
        <h4>
          <b>{{groupname}}</b>
        </h4>
      </center>
      <center>
        <p style="color: rgb(187,192,198);font-size: 1.2em;width:90%; word-wrap: break-word;
  word-break: break-all;">{{groupdes}}</p>
      </center>
    </div>
    <!--设置-->
    <div id="setInt">
      <br />
      <div id="setPhoto">
        <p>Photo</p>
        <div id="photo">
      <input type="file" style="display:none;" id="saveImage" name="myphoto" />
      <!--预览框-->
      <center>
        <div class="viewPhoto" v-if="!isShow">
          <img
            :src="imageSave"
            id="portrait"
            @click="moni()"
            style="cursor:pointer;width:6.5em;height:6.5em;"
          />
        </div>
      </center>
      <div v-if="isShow">
        <center>
          <img
            title="点我上传头像"
            src="img/avatar.png"
            alt="150*150"
            style="cursor:pointer;width:3.5em;height:3em;"
            @click="moni()"
          />
        </center>
        <center>
          <p style="color: rgb(144, 144, 151);">You can upload jpg,gif or png files.</p>
        </center>
        <center>
          <p style="color: rgb(144, 144, 151);">Max file size 3mb.</p>
        </center>
      </div>
    </div>
      </div>

      <div id="setName">
        <p>Name <span v-if="isMaxName" style="color:red;">
        <i class="el-icon-warning-outline">长度范围为2-10</i>
      </span></p>
        <input
          type="text"
          v-model="groupname"
          class="form-control"
          id="name"
          placeholder="Group name"
          @input="nameMax($event.target,10)"
        />
      </div>

      <div id="setTopic" style="margin-top:1em;">
        <p>Topic(optional)</p>
        <input
          type="text"
          v-model="topic"
          class="form-control"
          id="topic"
          placeholder="Group Topic"
        />
      </div>

      <div id="setDes" style="margin-top:1em;">
        <p>Description <span v-if="isMaxDes" style="color:red;">
        <i class="el-icon-warning-outline">50字以内</i>
      </span></p>
        <textarea
          v-model="groupdes"
          class="form-control"
          rows="2"
          id="des"
          placeholder="Group Description"
           @input="desMax($event.target,50)"
        ></textarea>
      </div>
      <button type="button" @click="saveMsg();imgSubmit();" class="btn btn-primary btn-lg btn-block">确认保存</button>
    </div>
  </div>
</template>

<style type="test/css">
.mainXiugai {
  height: 52em;
  background-color: #ffffff;
}
#photo {
  width: 90%;
  height: 6.8em;
  background-color: rgb(237, 238, 246);
  border-radius: 3%;
  margin-left: 5%;
}
#selfInt {
  height: 30%;
}
#setInt {
  border: 1px solid rgb(255, 255, 255);
  height: 62%;
  background-color: rgb(245, 246, 250);
}
#setInt p {
  color: #b4b4bd;
  margin-left: 5%;
  margin-bottom: 0.5em;
}
#setInt input {
  width: 90%;
  margin-left: 5%;
  background-color: #edeef6;
}
#setInt textarea {
  width: 90%;
  margin-left: 5%;
  background-color: #edeef6;
  overflow-y: auto;
  resize: none;
}
#setphoto {
  width: 90%;
  margin-left: 5%;
  border-radius: 3%;
  background-color: rgb(237, 238, 246);
}
#setInt button {
  width: 90%;
  margin-left: 5%;
  background-color: #0176ff;
  margin-top: 0.5em;
}
</style>

<script type="text/javascript">
import Msg from "./Msg.js";
export default {
  data() {
    return {
      groupname: "",
      topic: "",
      groupdes: "",
      grouptx:"",
      imageSave: "",
      isMaxName: false,
      isMaxDes: false,
      isShow: true,
      roomid:1
    };
  },
  mounted() {
    this.yulan();
    this.loadMsg();
  },
  methods: {
    saveMsg() {
      let _this = this;
      let Group = { name: this.groupName, detail: this.des };
      let _roomid=localStorage.getItem("roomid");
      let token1 = localStorage.getItem("token");
      token1 = token1.replace('"', "").replace('"', "");
      this.$axios
        .patch("/api/room/", {
          name: this.groupName,
          detail: this.des,
          token: token1,
          action: "register",
          roomid:_roomid
        })
        .then(rsp => {
           let data = JSON.parse(JSON.stringify(rsp.data)).data;
          localStorage.setItem("group", JSON.stringify(Group));
        })
        .catch(error => {
          console.log(error);
        });
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
    close() {
      Msg.$emit("obj", "0");
    },
     nameMax(str, len) {
      let temp = 0;
      for (let i = 0; i < str.value.length; i++) {
        if (/[\u4e00-\u9fa5]/.test(str.value[i])) {
          temp += 2;
        } else {
          temp++;
        }
        if (temp > len || temp < 2) {
          this.isMaxName = true;
        } else {
          this.isMaxName = false;
        }
      }
    },
    desMax(str, len) {
      let temp = 0;
      for (let i = 0; i < str.value.length; i++) {
        if (/[\u4e00-\u9fa5]/.test(str.value[i])) {
          temp += 2;
        } else {
          temp++;
        }
        if (temp > len) {
          this.isMaxDes = true;
        } else {
          this.isMaxDes = false;
        }
      }
    },
    moni() {
      document.getElementById("saveImage").click();
    },
    yulan() {
      let _this = this;
      document.getElementById("saveImage").onchange = function() {
        let imgFile = this.files[0];
        if (imgFile) {
          _this.isShow = false;
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
      let _token = localStorage.getItem("token");
      _token = _token.replace('"', "").replace('"', "");
      let _roomid=localStorage.getItem("roomid");
      let x = document.getElementById("saveImage").files[0];
      let icon = new FormData();
      icon.append("icon", x, x.name);
      icon.append("token", _token);
      icon.append("action", "register");
      icon.append("roomid",_roomid);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      this.$axios
        .patch("/api/room/", icon, config)
        .then(function(rsp) {
          let roomicons = "http://39.106.119.191/uploads/rooms/";
          let data = JSON.parse(JSON.stringify(rsp.data)).data;
          _this.imageSave = roomicons + data.icon;
          localStorage.setItem("gruopicon", _this.imageSave);
          _this.$notify({
            type: "success",
            message: "上传成功!",
            offset: 160
          });
        })
        .catch(function(error) {
          console.log(error);
          _this.$notify({
            type: "warning",
            message: "上传失败!",
            offset: 160
          });
        });
    }
  }
};
</script>