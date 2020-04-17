<template>
  <div class="mainProfile">
    <!--菜单点出来的个人信息Profile-->
    <div id="Profile">
      <h3>
        <strong>Profile</strong>
      </h3>

      <div class="pro-box">
        <div class="input-group" style="display: flex;">
          <input type="text" class="form-control" placeholder="Search for message or users" />
          <input type="button" class="search" />
        </div>
      </div>

      <div class="pro-box" id="proOne">
        <br />
        <center>
          <div id="touxiang">
            <img src="img/logo.png" />
          </div>
        </center>
        <center>
          <h4>
            <b>{{name}}</b>
          </h4>
        </center>
        <center>
          <p style="color: rgb(187,192,198);font-size: 1.2em;">这是一段个人简介</p>
        </center>
      </div>
      <div class="pro-box" id="proTwo">
        <br />
        <div class="proTwoInf">
          <div class="proTwoSpan">
            <p>Country</p>
            <span>Warsaw,Poland</span>
          </div>
          <div class="proTwoImg">
            <img src="img/diqiu.png" />
          </div>
        </div>
        <hr />
        <div class="proTwoInf">
          <div class="proTwoSpan">
            <p>Phone</p>
            <span>{{phone}}</span>
          </div>
          <div class="proTwoImg">
            <img src="img/yuyin.png" />
          </div>
        </div>
        <hr />
        <div class="proTwoInf">
          <div class="proTwoSpan">
            <p>Email</p>
            <span>{{email}}</span>
          </div>
          <div class="proTwoImg">
            <img src="img/youjian.png" />
          </div>
        </div>
        <hr />
        <div class="proTwoInf">
          <div class="proTwoSpan">
            <p>Time</p>
            <span>{{time}}</span>
          </div>
          <div class="proTwoImg">
            <img src="img/shizhong.png" />
          </div>
        </div>
      </div>
    </div>

    <!--首次登陆-->
    <button style="display:none;" id="chuxian" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
	开始演示模态框
</button>
    <div
      class="modal fade"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      data-backdrop="false"
      data-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">注册用户</h4>
          </div>
          <input type="text" class="form-control" style="height:3em;" v-model="name" placeholder="请输入用户名进入聊天室" />
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="zhuce()">提交更改</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>

    <!--设置-->
    <div id="Settings">
      <h4 style="margin-left: 5%;">
        <strong>Settings</strong>
      </h4>
      <p
        style="margin-left: 5%;font-size: 1.2em;color: rgb(144, 144, 151);"
      >Update your profile details</p>
      <hr />
      <div id="upSet">
        <div id="account" style="height: 10%;display: flex;">
          <div style="width: 83%;">
            <h4 style="margin-left: 5%;">
              <strong>Account</strong>
            </h4>
            <p style="margin-left: 5%;font-size: 1.2em;color: #8a8a91;">Update your profile details.</p>
          </div>
          <img src="img/user.png" />
        </div>
        <hr />
        <!--更换头像-->
        <div id="avatar">
          <label for="ava">Avatar</label>
          <div id="ava">
            <!--预览框-->
            <center>
              <div class="viewPhoto" v-if="!isShow">
                <img :src="imageSave" id="portrait" style="width:9em;height:9em" />
              </div>
            </center>
            <div id="tishi" v-if="isShow">
              <center>
                <img class="moni" title="点我上传头像" src="img/avatar.png" alt="150*150" @click="moni()" />
                <input type="file" id="saveImage" name="myphoto" />
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

        <div class="proSet">
          <label for>Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="form-control"
            placeholder="Type your name"
          />
        </div>
        <br />
        <div class="proSet">
          <label for>Phone</label>
          <input
            type="text"
            id="phone"
            v-model="phone"
            class="form-control"
            placeholder="(123) 456-7890"
          />
        </div>
        <br />
        <div class="proSet">
          <label for>Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            class="form-control"
            placeholder="you@yoursite.com"
          />
        </div>
        <br />
        <center>
          <button
            type="button"
            @click="saveMsg();imgSubmit()"
            class="btn btn-primary btn-lg"
          >Save Preferences</button>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      time: "",
      imageSave: "",
      isShow: true
    };
  },
  mounted() {
    this.isRandT();
    this.yulan();
  },
  created() {
    this.currentTime();
  },
  methods: {
    saveMsg() {
      let MSG = { name: this.name, phone: this.phone, email: this.email };
      console.log(MSG.name);
      localStorage.setItem("msg", JSON.stringify(MSG));
      let _token = localStorage.getItem("token");
      this.$axios
        .patch(
          "http://39.106.119.191/api/user/",
          qs.stringify({
            username: this.name,
            phone: this.phone,
            token: _token,
            action: "quicklogin"
          })
        )
        .then(rsp => {
          console.log(rsp.data);
          let datatoken = rsp.data.token;
          let id = rsp.data.id;
          localStorage.setItem("token", datatoken);
          localStorage.setItem("id", id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    zhuce() {
      this.isFirst = false;
      let MSG = { name: this.name, phone: this.phone, email: this.email };
      console.log(MSG.name);
      localStorage.setItem("msg", JSON.stringify(MSG));
      this.$axios
        .post(
          "http://39.106.119.191/api/user/",
          qs.stringify({
            username: this.name
          })
        )
        .then(rsp => {
          console.log(rsp.data);
          let datatoken = rsp.data.token;
          let id = rsp.data.id;
          localStorage.setItem("token", datatoken);
          localStorage.setItem("id", id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadMsg() {
      let MSG = JSON.parse(localStorage.getItem("msg"));
      this.name = MSG.name;
      this.phone = MSG.phone;
      this.email = MSG.email;
    },
    getTime() {
      let _this = this;
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mi =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.time = mm + "/" + dd + " " + hh + ":" + mi + ":" + ss;
    },
    currentTime() {
      setInterval(this.getTime, 1000);
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
      let x = document.getElementById("saveImage").files[0];
      let params = new FormData();
      params.append("file", x, x.name);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      this.$axios
        .post(api.personHeadImg, params, config)
        .then(function(res) {
          _this.imageSave = res.data.lujing;
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
    },
    isRandT() {
      if (
        typeof localStorage.token == "undefined" ||
        typeof localStorage.id == "undefined"
      ) {
        document.getElementById("chuxian").click();
      } else {
        this.loadMsg();
      }
    }
  }
};
</script>

<style type="text/css" scoped>
.mainProfile {
  border: solid rgb(245, 246, 250);
  height: 52em;
  background-color: rgb(245, 246, 250);
  display: flex;
}
#Profile {
  width: 25%;
  background-color: rgb(245, 246, 250);
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
#touxiang {
  width: 5em;
  height: 5em;
  border: 1px solid hsl(0, 3%, 72%);
  border-radius: 50%;
}
#touxiang img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: scale(1);
}
#proTwo {
  height: 48%;
  background-color: rgb(255, 255, 255);
  border-radius: 3%;
}
.proTwoInf {
  height: 14%;
  display: flex;
}
.proTwoSpan {
  width: 80%;
  height: 100%;
  margin-left: 1em;
}
.proTwoImg {
  width: 2.5em;
  height: 2.5em;
  margin-top: 0.6em;
  margin-left: 0.5em;
}
.proTwoImg img {
  width: 100%;
  height: auto;
  cursor: pointer;
}
.proTwoSpan p {
  color: #c4c7cc;
  font-size: 1em;
}
.proTwoSpan span {
  color: #9c9da6;
  font-size: 1.2em;
}

#Settings {
  width: 75%;
  background-color: rgb(255, 255, 255);
}
#avatar {
  height: 27.5%;
  width: 92%;
  margin-left: 4%;
}
#ava {
  height: 82%;
  border-radius: 3%;
  background-color: rgb(237, 238, 246);
}
#Settings button {
  width: 75%;
  text-align: center;
  background-color: rgb(1, 113, 245);
}
#account img {
  height: 2em;
  width: 2em;
}
#upSet {
  width: 46%;
  height: 85%;
  margin-left: 27%;
}
#upSet label {
  font-size: 1.2em;
  color: #8a8a91;
}
#upSet input {
  width: 100%;
  height: 50%;
  background-color: rgb(237, 238, 246);
  border: none;
  border-radius: 8px;
}

.pro-box {
  width: 90%;
  margin-top: 2em;
  margin-left: 5%;
}
.pro-logo {
  width: 2.8em;
  height: 2.8em;
  cursor: pointer;
  margin-top: 3%;
}
.proSet {
  width: 92%;
  margin-left: 4%;
}
.proSet input {
  font-size: 1.2em;
  padding: 0.75em 0.6em;
  border-radius: 2px;
}
#saveImage {
  display: none;
}
.moni {
  cursor: pointer;
}
</style>