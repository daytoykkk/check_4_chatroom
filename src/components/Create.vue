<template>
  <div class="createGroup">
    <h3>
      <strong>Create group</strong>
    </h3>
    <div class="cre-box">
      <div class="input-group" style="display: flex;">
        <input type="text" class="form-control" placeholder="Search for message or users..." />
        <input type="button" class="search" />
      </div>
    </div>
    <br />
    <label for="photo" id="photoLab">Photo</label>
    <div id="photo">
       <input type="file" style="display:none;" id="saveImage" name="myphoto" />
      <!--预览框-->
      <center>
        <div class="viewPhoto" v-if="!isShow">
          <img :src="imageSave" id="portrait" @click="moni()" style="width:9em;height:9em;cursor:pointer;" />
        </div>
      </center>
      <div v-if="isShow">
        <center> 
          <img
            title="点我上传头像"
            src="img/avatar.png"
            alt="150*150"
            style="cursor:pointer;"
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

    <br />
    <div class="settingAccount">
      <label for="cgName">Name</label>
      <span v-if="isMaxName" style="color:red;">
        <i class="el-icon-warning-outline">长度范围为2-10</i>
      </span>
      <input
        type="text"
        v-model="groupName"
        id="cgName"
        class="form-control"
        placeholder="Group Name"
        @input="nameMax($event.target,10)"
      />
    </div>
    <br />
    <div class="settingAccount">
      <label for="cgTopic">Topic(optional)</label>
      <input
        type="text"
        v-model="topic"
        id="cgTopic"
        class="form-control"
        placeholder="Group Topic"
      />
    </div>
    <br />
    <div class="settingAccount">
      <label for="cgDes">Description</label>
      <span v-if="isMaxDes" style="color:red;">
        <i class="el-icon-warning-outline">50字以内</i>
      </span>
      <input
        type="text"
        v-model="des"
        id="cgDes"
        class="form-control"
        placeholder="Group Description"
        @input="desMax($event.target,50)"
      />
    </div>
    <br />
    <br />
    <center>
      <button
        @click="createGroup();imgSubmit()"
        type="button"
        class="btn btn-primary btn-lg"
      >Create group</button>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupName: "",
      topic: "",
      des: "",
      imageSave: "",
      isMaxName: false,
      isMaxDes: false,
      isShow: true
    };
  },
  mounted() {
    this.yulan();
  },
  methods: {
    createGroup() {
      let group = {
        groupName: this.groupName,
        topic: this.topic,
        des: this.des
      };

      localStorage.setItem("group", JSON.stringify(group));
      this.$axios
        .post(
          "",
          qs.stringify({
            group
          })
        )
        .then(rsp => {
          console.log(rsp);
        })
        .catch(error => {
          console.log(error);
        });
      alert("保存成功！");
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
      let x = document.getElementById("saveImage").files[0];
      let icon = new FormData();
      icon.append("file", x, x.name);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      this.$axios
        .patch("http://39.106.119.191/api/user/", icon, config)
        .then(function(res) {
          let usericons = "http://39.106.119.191/uploads/usericons/";
          _this.imageSave = usericons + res.data.icon;
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

<style type="text/css" scoped>
.createGroup {
  border: solid rgb(245, 246, 250);
  height: 52em;
  background-color: rgb(245, 246, 250);
}
h3 {
  margin-left: 4%;
}
.cre-box {
  width: 92%;
  margin-top: 2em;
  margin-left: 4%;
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
#photo {
  width: 50%;
  height: 11em;
  background-color: rgb(237, 238, 246);
  border-radius: 3%;
  margin-left: 25%;
}
#photoLab {
  font-size: 1.2em;
  color: #8a8a91;
  margin-left: 25%;
}
.settingAccount {
  width: 50%;
  margin-left: 25%;
}
.settingAccount label {
  font-size: 1.2em;
  color: #8a8a91;
}
.settingAccount input {
  font-size: 1.2em;
  height: 2.5em;
  background-color: #edeef6;
  border: none;
}
.createGroup button {
  width: 30%;
  background-color: rgb(1, 118, 255);
}
</style>