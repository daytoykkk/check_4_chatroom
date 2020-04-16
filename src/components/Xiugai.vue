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
          <img src="img/logo.png" />
        </div>
      </center>
      <center>
        <h4>
          <b>{{groupname}}</b>
        </h4>
      </center>
      <center>
        <p style="color: rgb(187,192,198);font-size: 1.2em;">这是一段个人简介</p>
      </center>
    </div>
    <!--设置-->
    <div id="setInt">
      <br />
      <div id="setPhoto">
        <p>Photo</p>
        <div id="setphoto">
          <center>
            <img src="img/avatar.png" width="50px" height="42px" />
          </center>
          <center>
            <p style="color: rgb(144, 144, 151);">You can upload jpg,gif or png files.</p>
          </center>
          <center>
            <p style="color: rgb(144, 144, 151);">Max file size 3mb.</p>
          </center>
        </div>
      </div>

      <div id="setName">
        <p>Name</p>
        <input
          type="text"
          v-model="groupName"
          class="form-control"
          id="name"
          placeholder="Group name"
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
        <p>Description</p>
        <textarea
          v-model="des"
          class="form-control"
          rows="2"
          id="des"
          placeholder="Group Description"
        ></textarea>
      </div>
      <button type="button" @click="saveMsg()" class="btn btn-primary btn-lg btn-block">确认保存</button>
    </div>
  </div>
</template>

<style type="test/css">
.mainXiugai {
  height: 52em;
  background-color: #ffffff;
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
      des: ""
    };
  },
  mounted() {
    this.loadMsg();
  },
  methods: {
    saveMsg() {
      let group = {
        groupName: this.groupName,
        topic: this.topic,
        des: this.des
      };
      console.log(group.topic);
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
    loadMsg() {
      let group = JSON.parse(localStorage.getItem("group"));
      this.groupName = group.groupName;
      this.topic = group.topic;
      this.des = group.des;
    },
    close() {
      Msg.$emit("obj", "0");
    }
  }
};
</script>